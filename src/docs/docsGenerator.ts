import fs from "node:fs/promises";
import path from "node:path";
import type { AnalysisResult, ModuleUnit } from "../core/types.js";
import type { ModelConfig } from "../llm/modelConfig.js";
import { bulletList, heading, table } from "./markdown.js";
import { composeProjectNarrative, type ProjectNarrative } from "./narrativeComposer.js";
import {
  buildQualitySummary,
  renderQualityReport,
  type QualitySummary
} from "./qualityReport.js";
import {
  buildSemanticOverview,
  formatMethodName,
  isInternalResource,
  type SemanticOverview
} from "./semanticAggregator.js";

export interface GeneratedDocs {
  written: string[];
  overview: SemanticOverview;
  narrative: ProjectNarrative;
  quality: QualitySummary;
}

export async function generateDocs(result: AnalysisResult): Promise<GeneratedDocs> {
  const docsDir = path.join(result.rootPath, "docs");
  await fs.mkdir(docsDir, { recursive: true });
  const overview = buildSemanticOverview(result);
  const narrative = await composeProjectNarrative(
    result,
    overview,
    result.modelConfig as ModelConfig | undefined
  );

  const docs = new Map<string, string>([
    ["PROJECT_OVERVIEW.md", renderProjectOverview(result, overview, narrative)],
    ["ARCHITECTURE.md", renderArchitecture(result, overview, narrative)],
    ["MODULES.md", renderModules(result.modules)],
    ["EXECUTION_FLOWS.md", renderExecutionFlows(overview)],
    ["BUSINESS_FLOWS.md", renderBusinessFlows(overview, narrative)],
    ["CALL_GRAPH.md", renderCallGraph(result)],
    ["ENTRYPOINTS.md", renderEntrypoints(overview)],
    ["DATA_AND_RESOURCES.md", renderDataAndResources(result)],
    ["MAINTENANCE_GUIDE.md", renderMaintenanceGuide(result)]
  ]);
  docs.set("DOC_INDEX.md", "");
  const quality = buildQualitySummary(result, overview, narrative, docs);
  docs.set("DOC_INDEX.md", renderDocIndex(result, overview, narrative, quality, docs));
  docs.set("QUALITY_REPORT.md", renderQualityReport(result, overview, narrative, docs));

  const written: string[] = [];
  for (const [fileName, content] of docs) {
    const outputPath = path.join(docsDir, fileName);
    await fs.writeFile(outputPath, `${content.trim()}\n`, "utf8");
    written.push(outputPath);
  }

  return {
    written,
    overview,
    narrative,
    quality
  };
}

function renderDocIndex(
  result: AnalysisResult,
  overview: SemanticOverview,
  narrative: ProjectNarrative,
  quality: QualitySummary,
  docs: Map<string, string>
): string {
  const sourceFiles = result.files.filter(
    (file) => file.language === "typescript" || file.language === "javascript" || file.language === "java"
  );
  const externalResources = result.resources.filter(
    (resource) => !isInternalResource(resource.name)
  );
  const docRows = [
    ["PROJECT_OVERVIEW.md", "项目目标、运行模型、规模指标和生成产物总览。"],
    ["ARCHITECTURE.md", "架构层、模块区域、关键路径和核心热点方法。"],
    ["BUSINESS_FLOWS.md", "由框架入口驱动的业务流程和资源访问路径。"],
    ["EXECUTION_FLOWS.md", "由静态调用图推断出的执行路径。"],
    ["CALL_GRAPH.md", "可解析的仓库内部调用边和 Mermaid 图。"],
    ["ENTRYPOINTS.md", "框架感知入口和静态入口候选。"],
    ["DATA_AND_RESOURCES.md", "检测到的数据库、HTTP、文件、环境变量等资源。"],
    ["MODULES.md", "模块、类、关键方法和高信号方法摘要。"],
    ["MAINTENANCE_GUIDE.md", "当前分析边界、维护注意事项和仓库文件清单。"],
    ["QUALITY_REPORT.md", "质量得分、覆盖率、模板残留和输出完整性检查。"],
    ["CHANGE_SUMMARY.md", "本次分析相对上一版结构化结果的变化。"]
  ];

  return [
    heading(1, "Documentation Index"),
    "",
    narrative.projectOverview.purpose,
    "",
    heading(2, "Snapshot"),
    "",
    table(
      ["Metric", "Value"],
      [
        ["Quality score", `${quality.score}/100`],
        ["Scanned files", String(result.files.length)],
        ["Source files", String(sourceFiles.length)],
        ["Modules", String(result.modules.length)],
        ["Classes", String(result.classes.length)],
        ["Method units", String(result.methods.length)],
        ["LLM method summaries", `${quality.llmMethodSummaries}/${quality.methodUnits}`],
        ["Business flows", String(overview.businessFlows.length)],
        ["Static execution flows", String(overview.flows.length)],
        ["External resources", String(externalResources.length)],
        ["Graph edges", String(result.graph.edges.length)]
      ]
    ),
    "",
    heading(2, "Recommended Reading Order"),
    "",
    numberedList([
      "`PROJECT_OVERVIEW.md` - 先确认项目目标、运行模型和规模。",
      "`ARCHITECTURE.md` - 再看模块边界、关键路径和热点方法。",
      "`BUSINESS_FLOWS.md` / `EXECUTION_FLOWS.md` - 检查业务入口和静态执行路径。",
      "`DATA_AND_RESOURCES.md` - 追踪数据库、仓储、表、HTTP、文件和环境变量资源。",
      "`MODULES.md` / `.see-code/result.json` - 需要方法级细节时再深入查看。"
    ]),
    "",
    heading(2, "Document Map"),
    "",
    table(
      ["Document", "Use it for", "Size"],
      docRows.map(([fileName, description]) => [
        `[${fileName}](${fileName})`,
        description,
        docs.has(fileName) ? `${docs.get(fileName)?.length ?? 0} chars` : "generated later"
      ])
    ),
    "",
    heading(2, "Machine-readable Outputs"),
    "",
    bulletList([
      "`.see-code/result.json` 保存完整结构化分析结果，包括文件、模块、类、方法、资源、图和语义概览。",
      "`.see-code/result-diff.json` 保存相对上一版结果的机器可读差异。",
      "`schema/result.schema.json` 和 `schema/result-diff.schema.json` 定义输出契约。"
    ])
  ].join("\n");
}

function renderProjectOverview(
  result: AnalysisResult,
  overview: SemanticOverview,
  narrative: ProjectNarrative
): string {
  const sourceFiles = result.files.filter(
    (file) => file.language === "typescript" || file.language === "javascript" || file.language === "java"
  );
  const docsFiles = result.files.filter((file) => file.language === "markdown");
  const externalResources = result.resources.filter(
    (resource) => !isInternalResource(resource.name)
  );

  return [
    heading(1, "Project Overview"),
    "",
    `Repository path: \`${result.rootPath}\``,
    "",
    `Scan time: \`${result.scannedAt}\``,
    "",
    heading(2, "Purpose"),
    "",
    narrative.projectOverview.purpose,
    "",
    heading(2, "Operating Model"),
    "",
    numberedList(narrative.projectOverview.operatingModel),
    "",
    heading(2, "Key Capabilities"),
    "",
    bulletList(narrative.projectOverview.keyCapabilities),
    "",
    heading(2, "Primary Areas"),
    "",
    table(
      ["Area", "Modules", "Responsibilities"],
      overview.moduleGroups.map((group) => [
        group.name,
        group.modules.map((module) => module.path).join(", "),
        group.responsibilities.slice(0, 3).join(" ")
      ])
    ),
    "",
    heading(2, "Structure"),
    "",
    table(
      ["Metric", "Count"],
      [
        ["Scanned files", String(result.files.length)],
        ["Source files", String(sourceFiles.length)],
        ["Markdown documents", String(docsFiles.length)],
        ["Modules", String(result.modules.length)],
        ["Classes", String(result.classes.length)],
        ["Method units", String(result.methods.length)],
        ["External resource nodes", String(externalResources.length)],
        ["Graph edges", String(result.graph.edges.length)]
      ]
    ),
    "",
    heading(2, "Semantic Analyzer"),
    "",
    table(
      ["Field", "Value"],
      [
        ["Enabled", result.model?.enabled ? "yes" : "no"],
        ["Provider", result.model?.provider ?? "none"],
        ["Model", result.model?.model ?? ""],
        ["Base URL", result.model?.baseUrl ?? ""],
        ["LLM limit", result.model?.limit === undefined ? "unlimited" : String(result.model.limit)],
        ["Cache", result.model?.cacheEnabled ? "enabled" : "disabled"]
      ]
    ),
    "",
    heading(2, "Scan Configuration"),
    "",
    table(
      ["Field", "Value"],
      [
        ["Config file", result.scan?.configPath ?? "not found"],
        ["Max file bytes", String(result.scan?.maxFileBytes ?? "")],
        ["Exclude rules", result.scan?.exclude.join(", ") ?? ""]
      ]
    ),
    "",
    heading(2, "Generated Outputs"),
    "",
    bulletList([
      "`DOC_INDEX.md` 提供文档入口、质量快照、阅读顺序和文档地图。",
      "`PROJECT_OVERVIEW.md` 汇总仓库规模、目标和文档产物。",
      "`ARCHITECTURE.md` 描述模块区域、架构层次和运行时依赖。",
      "`MODULES.md` 列出模块、类、方法、导入和方法语义摘要。",
      "`EXECUTION_FLOWS.md` 汇总由调用边推断出的静态执行路径。",
      "`BUSINESS_FLOWS.md` 展示框架入口驱动的业务流候选。",
      "`CALL_GRAPH.md` 用 Mermaid 渲染已解析的仓库内部调用关系。",
      "`ENTRYPOINTS.md` 列出框架感知入口和静态入口候选。",
      "`DATA_AND_RESOURCES.md` 列出检测到的数据与外部资源。",
      "`MAINTENANCE_GUIDE.md` 记录当前分析边界和维护注意事项。",
      "`QUALITY_REPORT.md` 汇总文档质量、LLM 覆盖率和模板残留检查。",
      "`CHANGE_SUMMARY.md` 汇总本次分析相对上一版结构化结果的变化。",
      "`.see-code/result.json` 保存机器可读的完整结构化分析结果。",
      "`.see-code/result-diff.json` 保存机器可读的增量差异结果。",
      "`schema/result.schema.json` 和 `schema/result-diff.schema.json` 定义机器可读输出契约。"
    ])
  ].join("\n");
}

function renderArchitecture(
  result: AnalysisResult,
  overview: SemanticOverview,
  narrative: ProjectNarrative
): string {
  return [
    heading(1, "Architecture"),
    "",
    heading(2, "System Shape"),
    "",
    narrative.architecture.summary,
    "",
    heading(2, "Architecture Layers"),
    "",
    table(
      ["Layer", "Modules", "Responsibility"],
      narrative.architecture.layers.map((layer) => [
        layer.name,
        layer.modules.join(", "),
        layer.responsibility
      ])
    ),
    "",
    heading(2, "Critical Paths"),
    "",
    bulletList(narrative.architecture.criticalPaths),
    "",
    heading(2, "Module Areas"),
    "",
    table(
      ["Area", "Module Count", "Method Units", "Summary"],
      overview.moduleGroups.map((group) => [
        group.name,
        String(group.modules.length),
        String(group.modules.reduce((sum, module) => sum + module.methods.length, 0)),
        group.responsibilities[0] ?? "该区域主要承载配置、类型或文档资产，当前没有可抽取的方法级职责。"
      ])
    ),
    "",
    ...overview.moduleGroups
      .filter((group) => group.responsibilities.length > 0)
      .flatMap((group) => [
        heading(3, group.name),
        "",
        bulletList(group.responsibilities),
        ""
      ]),
    heading(2, "Core Method Hotspots"),
    "",
    table(
      ["Method", "Module", "Summary"],
      overview.hotMethods.map((method) => [
        formatMethodName(method),
        method.modulePath,
        method.summary
      ])
    ) || "暂无核心热点方法。",
    "",
    heading(2, "Runtime Resources"),
    "",
    table(
      ["Resource", "Kind"],
      result.resources
        .filter((resource) => !isInternalResource(resource.name))
        .map((resource) => [resource.name, resource.kind])
    ) || "暂无外部运行时资源。"
  ].join("\n");
}

function renderModules(modules: ModuleUnit[]): string {
  const maxMethodRowsPerModule = 8;
  const rows = modules.map((module) => [
    module.path,
    module.language,
    String(module.classes.length),
    String(module.methods.length),
    module.imports.slice(0, 6).join(", "),
    module.summary
  ]);

  const sections = modules.filter(hasModuleDetails).flatMap((module) => {
    const selectedMethods = selectHighSignalMethods(module.methods, maxMethodRowsPerModule);
    const lines = [
      heading(2, module.path),
      "",
      module.summary,
      "",
      heading(3, "Imports"),
      "",
      bulletList(module.imports.map((item) => `\`${item}\``))
    ];

    if (module.classes.length > 0) {
      lines.push(
        "",
        heading(3, "Classes"),
        "",
        table(
          ["Class", "Methods", "Location"],
          module.classes.map((classUnit) => [
            classUnit.name,
            String(classUnit.methods.length),
            `${classUnit.location.file}:${classUnit.location.startLine}`
          ])
        )
      );
    }

    if (module.methods.length > 0) {
      const limitNote =
        selectedMethods.length < module.methods.length
          ? [
              `显示 ${selectedMethods.length}/${module.methods.length} 个高信号方法；完整方法级结构、调用和语义见 \`.see-code/result.json\`。`,
              ""
            ]
          : [];
      lines.push(
        "",
        heading(3, "Key Method Units"),
        "",
        ...limitNote,
        table(
          ["Method", "Signature", "Return", "Hints", "Analyzer", "Summary", "Calls", "Location"],
          selectedMethods.map((method) => [
            method.className ? `${method.className}#${method.name}` : method.name,
            `\`${method.signature}\``,
            method.returnType ?? "",
            formatMethodHints(method),
            method.semantic?.analyzer ?? "heuristic",
            method.summary,
            method.calls.slice(0, 8).join(", "),
            `${method.location.file}:${method.location.startLine}`
          ])
        )
      );
    }

    return lines.join("\n");
  });

  return [
    heading(1, "Modules"),
    "",
    table(["Module", "Language", "Classes", "Methods", "Imports", "Summary"], rows),
    "",
    ...sections
  ].join("\n");
}

function hasModuleDetails(module: ModuleUnit): boolean {
  return module.imports.length > 0 || module.classes.length > 0 || module.methods.length > 0;
}

function selectHighSignalMethods(methods: ModuleUnit["methods"], limit: number): ModuleUnit["methods"] {
  if (methods.length <= limit) {
    return methods;
  }

  return methods
    .map((method, index) => ({
      method,
      index,
      score: scoreMethodForModuleDocs(method)
    }))
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .slice(0, limit)
    .sort((left, right) => left.index - right.index)
    .map((item) => item.method);
}

function scoreMethodForModuleDocs(method: ModuleUnit["methods"][number]): number {
  let score = 0;
  score += method.entrypointHints.length * 6;
  score += method.frameworkHints.length * 4;
  score += method.resources.length * 3;
  score += method.calls.length > 0 ? 2 : 0;
  score += method.visibility === "public" ? 1 : 0;
  score += method.semantic?.analyzer === "llm" ? 1 : 0;
  return score;
}

function formatMethodHints(method: ModuleUnit["methods"][number]): string {
  const hints = [
    ...method.entrypointHints.map((hint) =>
      hint.path ? `${hint.kind}:${hint.method ?? ""} ${hint.path}` : hint.kind
    ),
    ...method.frameworkHints.map((hint) =>
      hint.value ? `${hint.kind}:${hint.value}` : hint.kind
    )
  ];

  return [...new Set(hints)].join(", ");
}

function numberedList(items: string[]): string {
  if (items.length === 0) {
    return "1. 暂无可用步骤。";
  }

  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function renderCallGraph(result: AnalysisResult): string {
  const callEdges = result.graph.edges.filter((edge) => edge.kind === "calls");
  const labels = new Map(result.graph.nodes.map((node) => [node.id, node.label]));

  const mermaidLines = ["flowchart TD"];
  if (callEdges.length === 0) {
    mermaidLines.push('  Empty["暂无可解析的内部调用"]');
  } else {
    callEdges.forEach((edge, index) => {
      const from = `N${index}_A`;
      const to = `N${index}_B`;
      mermaidLines.push(`  ${from}["${escapeMermaid(labels.get(edge.from) ?? edge.from)}"]`);
      mermaidLines.push(`  ${to}["${escapeMermaid(labels.get(edge.to) ?? edge.to)}"]`);
      mermaidLines.push(`  ${from} --> ${to}`);
    });
  }

  return [
    heading(1, "Call Graph"),
    "",
    "调用图只展示能够唯一匹配到仓库内部方法单元的调用表达式。",
    "",
    "```mermaid",
    ...mermaidLines,
    "```",
    "",
    heading(2, "Edges"),
    "",
    table(
      ["From", "To", "Call", "Weight"],
      callEdges.map((edge) => [
        labels.get(edge.from) ?? edge.from,
        labels.get(edge.to) ?? edge.to,
        edge.label ?? "",
        String(edge.weight)
      ])
    ) || "暂无可解析的内部调用边。"
  ].join("\n");
}

function renderExecutionFlows(overview: SemanticOverview): string {
  const sections = overview.flows.flatMap((flow) => [
    heading(2, flow.name),
    "",
    `Entry: \`${flow.entrypoint.modulePath}:${flow.entrypoint.location.startLine}\` ${formatMethodName(flow.entrypoint)}`,
    "",
    heading(3, "Steps"),
    "",
    flow.steps.length > 0
      ? flow.steps.map((method, index) => `${index + 1}. ${formatMethodName(method)} - ${method.summary}`).join("\n")
      : "暂无可解析的内部步骤。",
    "",
    heading(3, "Resources"),
    "",
    bulletList(flow.resources.map((resource) => `\`${resource}\``)),
    ""
  ]);

  return [
    heading(1, "Execution Flows"),
    "",
    "执行流由静态调用图推断：入口候选通常没有已解析的内部调用者，并且至少调用了一个仓库内部方法。当前结果代表工程执行路径，不等同于完整运行时链路。",
    "",
    ...sections
  ].join("\n");
}

function renderBusinessFlows(
  overview: SemanticOverview,
  narrative: ProjectNarrative
): string {
  if (overview.businessFlows.length > 0) {
    return [
      heading(1, "Business Flows"),
      "",
      "业务流由框架入口提示生成，并沿已解析的调用边扩展。当前版本优先使用 HTTP、消息、定时任务、CLI 等入口提示；没有框架入口时不强行生成业务流。",
      "",
      ...overview.businessFlows.flatMap((flow) => {
        const narrativeFlow = matchingNarrativeFlow(flow.name, narrative);

        return [
          heading(2, flow.name),
          "",
          narrativeFlow?.narrative ?? `${flow.name} 从 ${formatMethodName(flow.entrypoint)} 入口开始，沿调用图展开执行步骤。`,
          "",
          table(
            ["Field", "Value"],
            [
              ["Entrypoint", `${flow.entrypoint.modulePath}:${flow.entrypoint.location.startLine} ${formatMethodName(flow.entrypoint)}`],
              ["Kind", flow.entrypointHint.kind],
              ["Protocol", flow.entrypointHint.protocol ?? ""],
              ["Method", flow.entrypointHint.method ?? ""],
              ["Path", flow.entrypointHint.path ?? ""]
            ]
          ),
          "",
          heading(3, "Steps"),
          "",
          numberedList(
            narrativeFlow?.steps ??
              flow.steps.map((method) => `${formatMethodName(method)} - ${method.summary}`)
          ),
          "",
          heading(3, "Resources"),
          "",
          bulletList(flow.resources.map((resource) => `\`${resource}\``)),
          ""
        ];
      })
    ].join("\n");
  }

  return [
    heading(1, "Business Flows"),
    "",
    "业务流需要框架入口与资源适配器提供更明确的业务边界。当前 MVP 会先在 `EXECUTION_FLOWS.md` 中生成基于调用图的静态执行路径。",
    "",
    heading(2, "Planned Inputs"),
    "",
    bulletList([
      "HTTP 路由元数据，例如 Express 路由或 Java Spring MVC 注解。",
      "消息消费与生产元数据，例如 Kafka、RabbitMQ 或框架事件处理器。",
      "定时任务元数据，例如 cron 装饰器或 Java 调度注解。",
      "持久化元数据，例如 Repository 接口、SQL Mapper 文件、ORM 模型和表名。",
      "来自包名、模块名、类名、方法名和 API 路径的领域命名线索。"
    ]),
    "",
    heading(2, "Current Substitute"),
    "",
    "在框架适配器提供业务入口前，先使用 `EXECUTION_FLOWS.md` 查看基于调用图的执行路径。"
  ].join("\n");
}

export function matchingNarrativeFlow(
  flowName: string,
  narrative: Pick<ProjectNarrative, "flows">
): ProjectNarrative["flows"][number] | undefined {
  return narrative.flows.find((item) => item.name === flowName);
}

function renderEntrypoints(overview: SemanticOverview): string {
  const hintedEntrypoints = overview.businessFlows.map((flow) => ({
    method: flow.entrypoint,
    hint: flow.entrypointHint,
    summary: flow.entrypoint.summary
  }));

  return [
    heading(1, "Entrypoints"),
    "",
    "入口点分为框架感知入口和静态候选入口。框架感知入口可用于生成业务流；静态候选入口只根据调用边推断。",
    "",
    heading(2, "Framework-aware Entrypoints"),
    "",
    table(
      ["Method", "Module", "Kind", "Protocol", "Route/Topic", "Summary"],
      hintedEntrypoints.map((entrypoint) => [
        formatMethodName(entrypoint.method),
        entrypoint.method.modulePath,
        entrypoint.hint.kind,
        entrypoint.hint.protocol ?? "",
        entrypoint.hint.path ?? entrypoint.hint.description ?? "",
        entrypoint.summary
      ])
    ) || "暂无框架感知入口。",
    "",
    heading(2, "Static Entrypoint Candidates"),
    "",
    table(
      ["Method", "Module", "Fan-out", "Reason", "Summary"],
      overview.entrypoints.map((entrypoint) => [
        formatMethodName(entrypoint.method),
        entrypoint.method.modulePath,
        String(entrypoint.fanOut),
        entrypoint.reason,
        entrypoint.method.summary
      ])
    ) || "暂无静态入口候选。"
  ].join("\n");
}

function renderDataAndResources(result: AnalysisResult): string {
  const externalResources = result.resources.filter(
    (resource) => !isInternalResource(resource.name)
  );

  return [
    heading(1, "Data And Resources"),
    "",
    table(
      ["Resource", "Kind"],
      externalResources.map((resource) => [resource.name, resource.kind])
    ) || "暂无外部数据或资源。"
  ].join("\n");
}

function renderMaintenanceGuide(result: AnalysisResult): string {
  return [
    heading(1, "Maintenance Guide"),
    "",
    heading(2, "Current Analysis Boundaries"),
    "",
    bulletList([
      "TypeScript 和 JavaScript 通过 TypeScript compiler AST 解析。",
      "Java 通过轻量静态解析适配器提取类、方法、注解、签名、调用、资源和常见 Spring 入口提示。",
      "`see-code.config.json` 提供非敏感的最小项目配置，用于扫描排除规则、最大文件大小和 LLM 默认值。",
      "`schema/result.schema.json` 和 `schema/result-diff.schema.json` 发布机器可读输出的稳定契约。",
      "语言解析统一通过适配器输出共享的 ModuleUnit、ClassUnit 和 MethodUnit 结构。",
      "MethodUnit 包含参数、返回类型、修饰符、注解或装饰器、框架线索和入口线索等语言无关元数据。",
      "更高保真的 Java 支持可以替换轻量适配器，例如接入 tree-sitter 或其他 Java AST 后端，而不改变语义分析器、关系图构建器或文档生成器。",
      "Markdown 和 JSON 文件会作为项目文档或资源参与扫描。",
      "调用边只在调用表达式能唯一解析到仓库内方法名时生成。",
      "资源检测是启发式能力，当前覆盖 HTTP URL、类似环境变量的字符串令牌和类似文件路径的字符串字面量。",
      "LLM 语义分析是可选步骤，在 AST 提取之后执行，需要配置 provider 和 API key。",
      "启用缓存时，LLM 方法语义结果会缓存在 `.see-code/cache` 下。",
      "项目概览、架构、入口点和流程文档由 MethodUnit 摘要与调用边确定性聚合生成。",
      "`EXECUTION_FLOWS.md` 来自静态调用边；`BUSINESS_FLOWS.md` 依赖框架入口和资源元数据。",
      "当前 MVP 尚未启用 LangGraph 编排和 tree-sitter 语言适配器。"
    ]),
    "",
    heading(2, "Repository Inventory"),
    "",
    table(
      ["File", "Language", "Bytes"],
      result.files.map((file) => [file.relativePath, file.language, String(file.bytes)])
    )
  ].join("\n");
}

function escapeMermaid(value: string): string {
  return value.replace(/"/g, '\\"');
}
