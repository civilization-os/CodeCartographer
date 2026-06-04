import type { AnalysisResult } from "../core/types.js";
import { bulletList, heading, table } from "./markdown.js";
import type { ProjectNarrative } from "./narrativeComposer.js";
import type { SemanticOverview } from "./semanticAggregator.js";

export interface QualityCheck {
  name: string;
  status: "pass" | "warn" | "fail";
  detail: string;
}

export interface QualitySummary {
  score: number;
  pass: number;
  warn: number;
  fail: number;
  methodUnits: number;
  llmMethodSummaries: number;
  businessFlows: number;
  staticExecutionFlows: number;
  checks: QualityCheck[];
  recommendations: string[];
}

export function renderQualityReport(
  result: AnalysisResult,
  overview: SemanticOverview,
  narrative: ProjectNarrative,
  docs: Map<string, string>
): string {
  const summary = buildQualitySummary(result, overview, narrative, docs);

  return [
    heading(1, "Quality Report"),
    "",
    heading(2, "Score"),
    "",
    table(
      ["Metric", "Value"],
      [
        ["Score", `${summary.score}/100`],
        ["Pass", String(summary.pass)],
        ["Warn", String(summary.warn)],
        ["Fail", String(summary.fail)],
        ["Method units", String(summary.methodUnits)],
        ["LLM method summaries", String(summary.llmMethodSummaries)],
        ["Business flows", String(summary.businessFlows)],
        ["Static execution flows", String(summary.staticExecutionFlows)]
      ]
    ),
    "",
    heading(2, "Checks"),
    "",
    table(
      ["Status", "Check", "Detail"],
      summary.checks.map((check) => [check.status.toUpperCase(), check.name, check.detail])
    ),
    "",
    heading(2, "Recommendations"),
    "",
    bulletList(summary.recommendations)
  ].join("\n");
}

export function buildQualitySummary(
  result: AnalysisResult,
  overview: SemanticOverview,
  narrative: ProjectNarrative,
  docs: Map<string, string>
): QualitySummary {
  const checks = buildChecks(result, overview, narrative, docs);
  const score = calculateScore(checks);

  return {
    score,
    pass: checks.filter((check) => check.status === "pass").length,
    warn: checks.filter((check) => check.status === "warn").length,
    fail: checks.filter((check) => check.status === "fail").length,
    methodUnits: result.methods.length,
    llmMethodSummaries: result.methods.filter((method) => method.semantic?.analyzer === "llm").length,
    businessFlows: overview.businessFlows.length,
    staticExecutionFlows: overview.flows.length,
    checks,
    recommendations: recommendations(checks, overview)
  };
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
      status: maxDocLength(docs) < 90_000 ? "pass" : "warn",
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
