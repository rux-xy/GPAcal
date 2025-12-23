import type { Course } from "../utils/gpaCalculator";
import { calculateGPA } from "../utils/gpaCalculator";

type GPACardProps = {
  courses: Course[];
};

function GPACard({ courses }: GPACardProps) {
  const currentGPA = courses.length > 0 ? calculateGPA(courses) : 0;

  return (
    <div className="border rounded-lg p-6 shadow-sm max-w-sm">
      <p className="text-sm text-gray-500">Current GPA</p>

      <p className="text-4xl font-bold mt-2">{currentGPA || "--"}</p>

      {courses.length > 0 && (
        <p className="text-sm text-green-600 mt-2">
          You are performing well this semester
        </p>
      )}
    </div>
  );
}

export default GPACard;
