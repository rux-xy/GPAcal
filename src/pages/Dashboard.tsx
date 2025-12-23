import GPACard from "../components/GPACard";
import GPAChart from "../components/GPAChart";

function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Top section */}
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* GPA summary */}
      <GPACard />

      {/* GPA progress chart */}
      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-4">GPA Progress</h2>
        <GPAChart />
      </div>
    </div>
  );
}

export default Dashboard;
