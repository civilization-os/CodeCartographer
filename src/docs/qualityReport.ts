import type { AnalysisResult } from "../core/types.js";
import { bulletList, heading, table } from "./markdown.js";
import type { ProjectNarrative } from "./narrativeComposer.js";
import type { SemanticOverview } from "./semanticAggregator.js";

interface QualityCheck {
  name: string;
  status: "pass" | "warn" | "fail";
  detail: string;
}

export function renderQualityReport(
  result: AnalysisResult,
  overview: SemanticOverview,
  narrative: ProjectNarrative,
  docs: Map<string, string>
): string {
  const checks = buildChecks(result, overview, narrative, docs);
  const score = calculateScore(checks);
  const statusCounts = {
    pass: checks.filter((check) => check.status === "pass").length,
    warn: checks.filter((check) => check.status === "warn").length,
    fail: checks.filter((check) => check.status === "fail").length
  };

  return [
    heading(1, "Quality Report"),
    "",
    heading(2, "Score"),
    "",
    table(
      ["Metric", "Value"],
      [
        ["Score", `${score}/100`],
        ["Pass", String(statusCounts.pass)],
        ["Warn", String(statusCounts.warn)],
        ["Fail", String(statusCounts.fail)],
        ["Method units", String(result.methods.length)],
        ["LLM method summaries", String(result.methods.filter((method) => method.semantic?.analyzer === "llm").length)],
        ["Business flows", String(overview.businessFlows.length)],
        ["Static execution flows", String(overview.flows.length)]
      ]
    ),
    "",
    heading(2, "Checks"),
    "",
    table(
      ["Status", "Check", "Detail"],
      checks.map((check) => [check.status.toUpperCase(), check.name, check.detail])
    ),
    "",
    heading(2, "Recommendations"),
    "",
    bulletList(recommendations(checks, overview))
  ].join("\n");
}

function buildChecks(
  result: AnalysisResult,
  overview: SemanticOverview,
  narrative: ProjectNarrative,
  docs: Map<string, string>
): QualityCheck[] {
  const allDocText = [...docs.values()].join("\n");
  const llmCount = result.methods.filter((method) => method.semantic?.analyzer === "llm").length;
  const heuristicCount = result.methods.filter((method) => method.semantic?.analyzer !== "llm").length;
  const placeholderMatches = countMatches(allDocText, [
    "No method-level responsibilities extracted",
    "contains 0 classes",
    "- None",
    "Overview not available"
  ]);
  const englishTemplateMatches = countMatches(allDocText, [
    "The graph contains",
    "Flows are inferred",
    "Business flows require",
    "No resolved internal caller"
  ]);

  return [
    {
      name: "Method summary coverage",
      status: heuristicCount === 0 ? "pass" : heuristicCount <= 3 ? "warn" : "fail",
      detail: `${llmCount}/${result.methods.length} methods use LLM summaries; ${heuristicCount} methods use fallback summaries.`
    },
    {
      name: "Narrative overview",
      status: isChineseNarrative(narrative.projectOverview.purpose) ? "pass" : "warn",
      detail: narrative.projectOverview.purpose.slice(0, 120)
    },
    {
      name: "Architecture abstraction",
      status: narrative.architecture.layers.length >= 4 ? "pass" : "warn",
      detail: `${narrative.architecture.layers.length} architecture layers generated.`
    },
    {
      name: "Business flow coverage",
      status: overview.businessFlows.length > 0 ? "pass" : "warn",
      detail: `${overview.businessFlows.length} framework-aware business flows generated.`
    },
    {
      name: "Static execution flow coverage",
      status: overview.flows.length > 0 ? "pass" : "warn",
      detail: `${overview.flows.length} static execution flows generated.`
    },
    {
      name: "Placeholder residue",
      status: placeholderMatches === 0 ? "pass" : placeholderMatches <= 5 ? "warn" : "fail",
      detail: `${placeholderMatches} placeholder-like fragments found across generated docs.`
    },
    {
      name: "English template residue",
      status: englishTemplateMatches === 0 ? "pass" : englishTemplateMatches <= 3 ? "warn" : "fail",
      detail: `${englishTemplateMatches} English template fragments found across generated docs.`
    },
    {
      name: "Document size balance",
      status: maxDocLength(docs) < 60_000 ? "pass" : "warn",
      detail: `Largest document is ${maxDocLength(docs)} characters.`
    },
    {
      name: "Required outputs",
      status: hasRequiredDocs(docs) ? "pass" : "fail",
      detail: `${docs.size} documents generated before quality report.`
    }
  ];
}

function calculateScore(checks: QualityCheck[]): number {
  const raw = checks.reduce((sum, check) => {
    if (check.status === "pass") {
      return sum + 100;
    }
    if (check.status === "warn") {
      return sum + 60;
    }
    return sum;
  }, 0);

  return Math.round(raw / checks.length);
}

function recommendations(checks: QualityCheck[], overview: SemanticOverview): string[] {
  const items: string[] = [];

  if (checks.some((check) => check.name === "Placeholder residue" && check.status !== "pass")) {
    items.push("Reduce placeholder text in generated templates and prefer omitting empty sections.");
  }
  if (checks.some((check) => check.name === "English template residue" && check.status !== "pass")) {
    items.push("Localize remaining fixed template text to Chinese for user-facing documents.");
  }
  if (overview.businessFlows.length === 0) {
    items.push("Add framework-aware entrypoint adapters so BUSINESS_FLOWS.md can describe real business flows.");
  }
  if (items.length === 0) {
    items.push("Keep parser adapters and prompt changes behind this quality report to catch regressions.");
  }

  return items;
}

function countMatches(text: string, patterns: string[]): number {
  return patterns.reduce((sum, pattern) => sum + text.split(pattern).length - 1, 0);
}

function isChineseNarrative(value: string): boolean {
  return /[\u4e00-\u9fff]/.test(value) && value.length > 20;
}

function maxDocLength(docs: Map<string, string>): number {
  return Math.max(...[...docs.values()].map((content) => content.length), 0);
}

function hasRequiredDocs(docs: Map<string, string>): boolean {
  return [
    "PROJECT_OVERVIEW.md",
    "ARCHITECTURE.md",
    "MODULES.md",
    "BUSINESS_FLOWS.md",
    "EXECUTION_FLOWS.md",
    "CALL_GRAPH.md",
    "ENTRYPOINTS.md",
    "DATA_AND_RESOURCES.md",
    "MAINTENANCE_GUIDE.md"
  ].every((fileName) => docs.has(fileName));
}
