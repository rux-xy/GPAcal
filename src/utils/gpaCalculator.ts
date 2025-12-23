export type Course = {
  code: string;
  name: string;
  credits: number;
  grade: number;
  semester: number;
};

export function calculateGPA(courses: Course[]): number {
  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    totalPoints += course.grade * course.credits;
    totalCredits += course.credits;
  });

  if (totalCredits === 0) return 0;

  return Number((totalPoints / totalCredits).toFixed(2));
}
