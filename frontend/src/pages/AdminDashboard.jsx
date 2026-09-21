import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import "./AdminDashboard.css";

function AdminDashboard({ theme, toggleTheme }) {
  const [studentCount, setStudentCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);

  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const studentData = await apiRequest("/students");
        setStudents(studentData);
        setStudentCount(studentData.length);

        const facultyData = await apiRequest("/faculties");
        setFaculty(facultyData);
        setFacultyCount(facultyData.length);

        const courses = await apiRequest("/courses");
        setCourseCount(courses.length);

        const subjects = await apiRequest("/subjects");
        setSubjectCount(subjects.length);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      }
    };

    loadDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      {/* ================================================= */}
      {/* SIDEBAR                                           */}
      {/* ================================================= */}

      <aside className="admin-sidebar">
        {/* BRAND */}

        <div className="admin-brand">
          <div className="admin-brand-logo">EM</div>

          <div className="admin-brand-text">
            <h2>EduManage</h2>
            <span>Management System</span>
          </div>
        </div>

        {/* NAVIGATION */}

        <nav className="admin-navigation">
          {/* MAIN */}

          <div className="nav-section">
            <div className="nav-section-title">MAIN</div>

            <button
              className="nav-item active"
              onClick={() => navigate("/admin")}
            >
              <span className="nav-icon">▦</span>
              <span>Dashboard</span>
            </button>
          </div>

          {/* MANAGEMENT */}

          <div className="nav-section">
            <div className="nav-section-title">MANAGEMENT</div>

            <button className="nav-item" onClick={() => navigate("/students")}>
              <span className="nav-icon">♙</span>
              <span>Students</span>
            </button>

            <button
              className="nav-item"
              onClick={() => navigate("/faculty-management")}
            >
              <span className="nav-icon">♟</span>
              <span>Faculty</span>
            </button>

            <button
              className="nav-item"
              onClick={() => navigate("/departments")}
            >
              <span className="nav-icon">⌂</span>
              <span>Departments</span>
            </button>

            <button className="nav-item" onClick={() => navigate("/courses")}>
              <span className="nav-icon">▤</span>
              <span>Courses</span>
            </button>

            <button className="nav-item" onClick={() => navigate("/subjects")}>
              <span className="nav-icon">▥</span>
              <span>Subjects</span>
            </button>
          </div>

          {/* ACADEMICS */}

          <div className="nav-section">
            <div className="nav-section-title">ACADEMICS</div>

            <button
              className="nav-item"
              onClick={() => navigate("/attendance")}
            >
              <span className="nav-icon">◷</span>
              <span>Attendance</span>
            </button>
            <button className="nav-item" onClick={() => navigate("/marks")}>
              <span className="nav-icon">◈</span>
              <span>Marks</span>
            </button>
          </div>

          {/* SYSTEM */}

          <div className="nav-section">
            <div className="nav-section-title">SYSTEM</div>

            <button className="nav-item" onClick={() => navigate("/users")}>
              <span className="nav-icon">...</span>
              <span>Users</span>
            </button>

            <button
              className="nav-item"
              onClick={() => navigate("/admin/settings")}
            >
              <span className="nav-icon">⚙</span>
              <span>Settings</span>
            </button>
          </div>
        </nav>

        {/* SIDEBAR BOTTOM */}

        <div className="sidebar-bottom">
          {/* THEME */}

          <button className="sidebar-bottom-item" onClick={toggleTheme}>
            <span className="nav-icon">{theme === "light" ? "☾" : "☀"}</span>

            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>

            <span className="theme-switch">
              <span
                className={`theme-switch-circle ${
                  theme === "dark" ? "theme-switch-active" : ""
                }`}
              ></span>
            </span>
          </button>

          {/* PROFILE */}

          <button
            className="sidebar-bottom-item"
            onClick={() => navigate("/admin/profile")}
          >
            <span className="nav-icon">◉</span>
            <span>My Profile</span>
          </button>

          {/* LOGOUT */}

          <button
            className="sidebar-bottom-item logout-button"
            onClick={handleLogout}
          >
            <span className="nav-icon">↪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================================================= */}
      {/* MAIN CONTENT                                      */}
      {/* ================================================= */}

      <main className="admin-main">
        {/* ================================================= */}
        {/* TOP HEADER                                        */}
        {/* ================================================= */}

        <header className="admin-header">
          <div className="header-left">
            <div className="breadcrumb">
              <span>Admin</span>
              <span>/</span>
              <strong>Dashboard</strong>
            </div>

            <h1>Dashboard</h1>

            <p>Welcome back, Admin. Here's what's happening today.</p>
          </div>

          <div className="header-right">
            {/* NOTIFICATION */}

            <button className="header-icon-button">
              ♢<span className="notification-dot"></span>
            </button>

            {/* PROFILE */}

            <button
              className="header-profile"
              onClick={() => navigate("/admin/profile")}
            >
              <div className="profile-avatar">A</div>

              <div className="profile-info">
                <strong>Admin</strong>

                <span>Administrator</span>
              </div>

              <span className="profile-arrow">˅</span>
            </button>
          </div>
        </header>

        {/* ================================================= */}
        {/* WELCOME CARD                                      */}
        {/* ================================================= */}

        <section className="welcome-card">
          <div className="welcome-content">
            <span className="welcome-label">ADMINISTRATOR</span>

            <h2>Good to see you, Admin 👋</h2>

            <p>
              Manage your students, faculty, courses and academic activities
              from one place.
            </p>
          </div>

          <div className="welcome-decoration">
            <div className="decoration-circle circle-one"></div>
            <div className="decoration-circle circle-two"></div>
            <div className="decoration-circle circle-three"></div>
          </div>
        </section>

        {/* ================================================= */}
        {/* STATISTICS                                        */}
        {/* ================================================= */}

        <section className="dashboard-stats">
          {/* STUDENTS */}

          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-icon student-icon">♙</div>

              <span className="stat-menu">•••</span>
            </div>

            <div className="stat-content">
              <span>Total Students</span>

              <strong>{studentCount}</strong>
            </div>

            <div className="stat-footer">
              <span className="stat-positive">↑ Active</span>

              <span>Students</span>
            </div>
          </div>

          {/* FACULTY */}

          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-icon faculty-icon">♟</div>

              <span className="stat-menu">•••</span>
            </div>

            <div className="stat-content">
              <span>Total Faculty</span>

              <strong>{facultyCount}</strong>
            </div>

            <div className="stat-footer">
              <span className="stat-positive">↑ Active</span>

              <span>Faculty</span>
            </div>
          </div>

          {/* COURSES */}

          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-icon course-icon">▤</div>

              <span className="stat-menu">•••</span>
            </div>

            <div className="stat-content">
              <span>Total Courses</span>

              <strong>{courseCount}</strong>
            </div>

            <div className="stat-footer">
              <span className="stat-positive">Available</span>

              <span>Courses</span>
            </div>
          </div>

          {/* SUBJECTS */}

          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-icon subject-icon">▥</div>

              <span className="stat-menu">•••</span>
            </div>

            <div className="stat-content">
              <span>Total Subjects</span>

              <strong>{subjectCount}</strong>
            </div>

            <div className="stat-footer">
              <span className="stat-positive">Available</span>

              <span>Subjects</span>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* RECENT DATA                                       */}
        {/* ================================================= */}

        <section className="dashboard-grid">
          {/* RECENT STUDENTS */}

          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <span className="card-label">STUDENTS</span>

                <h2>Recent Students</h2>

                <p>Recently registered students</p>
              </div>

              <button
                className="view-all-button"
                onClick={() => navigate("/students")}
              >
                View All
                <span>→</span>
              </button>
            </div>

            <div className="student-list">
              {students.slice(0, 3).map((student) => (
                <div className="student-row" key={student.stdRollNo}>
                  <div className="student-avatar">
                    {student.firstName.charAt(0)}
                  </div>

                  <div className="student-info">
                    <strong>
                      {student.firstName} {student.middleName || ""}{" "}
                      {student.lastName}
                    </strong>

                    <span>{student.stdEmail}</span>
                  </div>

                  <span className="row-arrow">→</span>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT FACULTY */}

          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <span className="card-label">FACULTY</span>

                <h2>Recent Faculty</h2>

                <p>Recently registered faculty</p>
              </div>

              <button
                className="view-all-button"
                onClick={() => navigate("/faculty-management")}
              >
                View All
                <span>→</span>
              </button>
            </div>

            <div className="student-list">
              {faculty.slice(0, 3).map((member) => (
                <div className="student-row" key={member.id}>
                  <div className="student-avatar faculty-avatar">
                    {member.firstName.charAt(0)}
                  </div>

                  <div className="student-info">
                    <strong>
                      {member.firstName} {member.middleName || ""}{" "}
                      {member.lastName}
                    </strong>

                    <span>{member.email}</span>
                  </div>

                  <span className="row-arrow">→</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* QUICK ACTIONS                                     */}
        {/* ================================================= */}

        <section className="quick-actions-card">
          <div className="quick-actions-header">
            <div>
              <span className="card-label">SHORTCUTS</span>

              <h2>Quick Actions</h2>

              <p>Frequently used administrative actions</p>
            </div>
          </div>

          <div className="quick-actions">
            <button
              className="quick-action"
              onClick={() =>
                navigate("/students", {
                  state: {
                    openAddStudent: true,
                  },
                })
              }
            >
              <div className="quick-action-icon">＋</div>

              <div>
                <strong>Add Student</strong>

                <span>Register a new student</span>
              </div>

              <span className="quick-action-arrow">→</span>
            </button>

            <button
              className="quick-action"
              onClick={() =>
                navigate("/faculty-management", {
                  state: {
                    openAddFaculty: true,
                  },
                })
              }
            >
              <div className="quick-action-icon">＋</div>

              <div>
                <strong>Add Faculty</strong>

                <span>Register a new faculty member</span>
              </div>

              <span className="quick-action-arrow">→</span>
            </button>

            <button
              className="quick-action"
              onClick={() =>
                navigate("/courses", {
                  state: {
                    openAddCourse: true,
                  },
                })
              }
            >
              <div className="quick-action-icon">＋</div>

              <div>
                <strong>Add Course</strong>

                <span>Create a new course</span>
              </div>

              <span className="quick-action-arrow">→</span>
            </button>

            <button
              className="quick-action"
              onClick={() =>
                navigate("/subjects", {
                  state: {
                    openAddSubject: true,
                  },
                })
              }
            >
              <div className="quick-action-icon">＋</div>

              <div>
                <strong>Add Subject</strong>

                <span>Create a new subject</span>
              </div>

              <span className="quick-action-arrow">→</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
