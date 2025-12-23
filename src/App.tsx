import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import type { Course } from "./utils/gpaCalculator";

// Pages
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Analysis from "./pages/Analysis";
import Graphs from "./pages/Graphs";
import Settings from "./pages/Settings";
import Credits from "./pages/Credits";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [courses, setCourses] = useState<Course[]>([
    {
      code: "COSC32152",
      subject: "COSC",
      level: 3,
      semester: 1,
      credits: 4,
      name: "Advanced Programming",
      grade: "A-",
    },
    {
      code: "STAT20151",
      subject: "STAT",
      level: 2,
      semester: 1,
      credits: 3,
      name: "Statistics I",
      grade: "B+",
    },
    {
      code: "PMAT10152",
      subject: "PMAT",
      level: 1,
      semester: 2,
      credits: 3,
      name: "Pre-Calculus",
      grade: "B",
    },
  ]);

  function addCourse(course: Course) {
    setCourses((prev) => [...prev, course]);
  }

  function deleteCourse(code: string) {
    setCourses((prev) => prev.filter((c) => c.code !== code));
  }

  function updateCourse(updated: Course) {
    setCourses((prev) =>
      prev.map((c) => (c.code === updated.code ? updated : c))
    );
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/courses"
          element={
            <Courses
              courses={courses}
              onAddCourse={addCourse}
              onDeleteCourse={deleteCourse}
              onUpdateCourse={updateCourse}
            />
          }
        />

        <Route path="/analysis" element={<Analysis courses={courses} />} />
        <Route path="/graphs" element={<Graphs courses={courses} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
