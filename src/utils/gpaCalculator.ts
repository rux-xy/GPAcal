export type SubjectType = "COSC" | "STAT" | "PMAT";

export type Course = {
  code: string; // e.g. COSC32152
  subject: SubjectType; // COSC | STAT | PMAT
  level: number; // 1 | 2 | 3
  semester: number; // 1 | 2
  credits: number; // 2 | 3 | 4
  name: string;
  grade: string; // A, A-, B+, etc.
};

/* Letter → GPA map */
const gradePoints: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  D: 1.0,
  F: 0.0,
};

export function calculateGPA(courses: Course[]): number {
  if (courses.length === 0) return 0;

  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    const points = gradePoints[course.grade] ?? 0;
    totalPoints += points * course.credits;
    totalCredits += course.credits;
  });

  return Number((totalPoints / totalCredits).toFixed(2));
}
