export function heading(level: number, text: string): string {
  return `${"#".repeat(level)} ${text}`;
}

export function table(headers: string[], rows: string[][]): string {
  if (rows.length === 0) {
    return "";
  }

  const header = `| ${headers.join(" | ")} |`;
  const separator = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`);
  return [header, separator, ...body].join("\n");
}

export function bulletList(items: string[]): string {
  if (items.length === 0) {
    return "- 无";
  }
  return items.map((item) => `- ${item}`).join("\n");
}

function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}
