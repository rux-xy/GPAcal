import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
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
  const { user, loading } = useAuth();

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

  // Prevent flicker while Firebase restores session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* Show Navbar only when logged in */}
      {user && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses
                courses={courses}
                onAddCourse={addCourse}
                onDeleteCourse={deleteCourse}
                onUpdateCourse={updateCourse}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analysis"
          element={
            <ProtectedRoute>
              <Analysis courses={courses} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/graphs"
          element={
            <ProtectedRoute>
              <Graphs courses={courses} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/credits"
          element={
            <ProtectedRoute>
              <Credits />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
