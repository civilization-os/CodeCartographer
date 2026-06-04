import path from "node:path";

export function toPosixPath(value: string): string {
  return value.split(path.sep).join("/");
}

export function stableId(...parts: string[]): string {
  return parts
    .join(":")
    .replace(/\\/g, "/")
    .replace(/[^a-zA-Z0-9_./:#-]+/g, "-");
}
