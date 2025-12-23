import type { SubjectType } from "./gpaCalculator";

export function parseCourseCode(code: string) {
  const subject = code.substring(0, 4) as SubjectType;
  const level = Number(code[4]);
  const semester = Number(code[5]);
  const credits = Number(code[code.length - 1]);

  return {
    subject,
    level,
    semester,
    credits,
  };
}
