import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import type { Course } from "./utils/gpaCalculator";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Analysis from "./pages/Analysis";
import Graphs from "./pages/Graphs";
import Settings from "./pages/Settings";
import Credits from "./pages/Credits";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import { useAuth } from "./context/AuthContext";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "./lib/courseService";

function App() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  /* LOAD COURSES */
  useEffect(() => {
    if (!user) return;

    getCourses(user.uid).then(setCourses);
  }, [user]);

  async function handleAdd(course: Course) {
    if (!user) return;
    await addCourse(user.uid, course);
    setCourses(await getCourses(user.uid));
  }

  async function handleUpdate(course: Course & { id?: string }) {
    if (!user || !course.id) return;
    await updateCourse(user.uid, course as any);
    setCourses(await getCourses(user.uid));
  }

  async function handleDelete(code: string) {
    if (!user) return;

    const course = courses.find((c) => c.code === code);
    if (!course?.id) return;

    await deleteCourse(user.uid, course.id);
    setCourses(await getCourses(user.uid));
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard courses={courses} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses
                courses={courses}
                onAddCourse={handleAdd}
                onUpdateCourse={handleUpdate}
                onDeleteCourse={handleDelete}
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

        <Route path="/credits" element={<Credits />} />
      </Routes>
    </>
  );
}

export default App;
