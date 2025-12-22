import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">GPAcal</h1>

      <div className="flex gap-4 text-sm">
        <Link to="/">Dashboard</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/analysis">Analysis</Link>
        <Link to="/graphs">Graphs</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  );
}

export default Navbar;
