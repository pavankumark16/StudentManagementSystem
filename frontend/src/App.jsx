import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Students from "./pages/Students";
import Faculty from "./pages/Faculty";
import Attendance from "./pages/Attendance";
import Marks from "./pages/Marks";
import StudentMarks from "./pages/StudentMarks";
import StudentAttendance from "./pages/StudentAttendance";
import Departments from "./pages/Departments";
import Courses from "./pages/Courses";
import Subjects from "./pages/Subjects";
import Users from "./pages/Users";
import AdminProfile from "./pages/AdminProfile";
import AdminSettings from "./pages/AdminSettings";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={<AdminDashboard theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/faculty"
          element={<FacultyDashboard theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/student"
          element={<StudentDashboard theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/students"
          element={<Students theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/faculty-management"
          element={<Faculty theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/attendance"
          element={<Attendance theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/marks"
          element={<Marks theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/student/marks"
          element={<StudentMarks theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/student/attendance"
          element={
            <StudentAttendance theme={theme} toggleTheme={toggleTheme} />
          }
        />

        <Route
          path="/departments"
          element={<Departments theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/courses"
          element={<Courses theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/subjects"
          element={<Subjects theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/users"
          element={<Users theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/admin/profile"
          element={<AdminProfile theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/admin/settings"
          element={<AdminSettings theme={theme} toggleTheme={toggleTheme} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
