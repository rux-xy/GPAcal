import GPACard from "../components/GPACard";
import GPAChart from "../components/GPAChart";
import type { Course } from "../utils/gpaCalculator";

type DashboardProps = {
  courses: Course[];
};

function Dashboard({ courses }: DashboardProps) {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-gray-500">Courses: {courses.length}</p>

      {/* GPA Summary */}
      <GPACard courses={courses} />

      {/* GPA Progress */}
      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-4">GPA Progress</h2>
        <GPAChart courses={courses} />
      </div>
    </div>
  );
}

export default Dashboard;
