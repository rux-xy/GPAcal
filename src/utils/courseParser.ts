import type { SubjectCode } from "./gpaCalculator";

export function parseSubjectFromCode(code: string): SubjectCode {
  const prefix = code.slice(0, 4).toUpperCase();

  if (prefix === "COSC") return "COSC";
  if (prefix === "STAT") return "STAT";
  if (prefix === "PMAT") return "PMAT";

  return "UNKNOWN";
}
