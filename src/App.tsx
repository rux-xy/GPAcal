import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

// Pages
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Analysis from "./pages/Analysis";
import Graphs from "./pages/Graphs";
import Settings from "./pages/Settings";
import Credits from "./pages/Credits";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/graphs" element={<Graphs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
