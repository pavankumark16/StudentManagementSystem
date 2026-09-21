import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import "./StudentDashboard.css";

function StudentDashboard({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================
     LOAD LOGGED-IN STUDENT
     ========================================= */

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const data = await apiRequest("/students/me");

        setStudent(data);
      } catch (error) {
        console.error(error);

        setError("Unable to load student profile");
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, []);

  /* =========================================
     LOGOUT
     ========================================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  /* =========================================
     STUDENT NAME
     ========================================= */

  const getStudentName = () => {
    if (!student) {
      return "";
    }

    return [student.firstName, student.middleName, student.lastName]
      .filter(Boolean)
      .join(" ");
  };

  /* =========================================
     INITIAL
     ========================================= */

  const getInitial = () => {
    if (!student?.firstName) {
      return "S";
    }

    return student.firstName.charAt(0).toUpperCase();
  };

  /* =========================================
     LOADING
     ========================================= */

  if (loading) {
    return (
      <div className="student-dashboard-loading">
        <div className="student-loading-spinner"></div>

        <p>Loading your dashboard...</p>
      </div>
    );
  }

  /* =========================================
     ERROR
     ========================================= */

  if (error || !student) {
    return (
      <div className="student-dashboard-error">
        <div className="student-error-card">
          <div className="student-error-icon">!</div>

          <h2>Unable to Load Dashboard</h2>

          <p>{error || "Student profile not found"}</p>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  /* =========================================
     DASHBOARD
     ========================================= */

  return (
    <div className="student-dashboard">
      {/* =====================================
          HEADER
          ===================================== */}

      <header className="student-dashboard-header">
        <div>
          <div className="student-dashboard-title-row">
            <h1>Student Dashboard</h1>

            <span className="student-role-badge">STUDENT</span>
          </div>

          <p>Welcome back, {student.firstName}</p>
        </div>

        <div className="student-dashboard-actions">
          <button className="student-theme-button" onClick={toggleTheme}>
            <span>{theme === "light" ? "☾" : "☀"}</span>

            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

          <button className="student-logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* =====================================
          PROFILE HERO
          ===================================== */}

      <section className="student-profile-card">
        <div className="student-profile-main">
          <div className="student-profile-avatar">{getInitial()}</div>

          <div className="student-profile-info">
            <span className="student-profile-label">STUDENT PROFILE</span>

            <h2>{getStudentName()}</h2>

            <p>
              Roll Number: <strong>{student.stdRollNo}</strong>
            </p>
          </div>
        </div>

        <div className="student-profile-academic">
          <div>
            <span>Department</span>

            <strong>{student.department?.name || "-"}</strong>
          </div>

          <div>
            <span>Course</span>

            <strong>{student.course?.name || "-"}</strong>
          </div>
        </div>
      </section>

      {/* =====================================
          ACADEMIC SUMMARY
          ===================================== */}

      <section className="student-section">
        <div className="student-section-heading">
          <div>
            <h2>Academic Overview</h2>

            <p>Your academic information at a glance</p>
          </div>
        </div>

        <div className="student-summary-grid">
          {/* DEPARTMENT */}

          <div className="student-summary-card">
            <div className="student-summary-icon">🏫</div>

            <div>
              <span>Department</span>

              <strong>{student.department?.name || "-"}</strong>
            </div>
          </div>

          {/* COURSE */}

          <div className="student-summary-card">
            <div className="student-summary-icon">📚</div>

            <div>
              <span>Course</span>

              <strong>{student.course?.name || "-"}</strong>
            </div>
          </div>

          {/* COURSE DURATION */}

          <div className="student-summary-card">
            <div className="student-summary-icon">⏱</div>

            <div>
              <span>Course Duration</span>

              <strong>{student.course?.duration || "-"}</strong>
            </div>
          </div>

          {/* JOINING DATE */}

          <div className="student-summary-card">
            <div className="student-summary-icon">📅</div>

            <div>
              <span>Joining Date</span>

              <strong>{student.joiningDate || "-"}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          PERSONAL INFORMATION
          ===================================== */}

      <section className="student-section">
        <div className="student-section-heading">
          <div>
            <h2>Personal Information</h2>

            <p>Your registered student details</p>
          </div>
        </div>

        <div className="student-details-card">
          <div className="student-detail-item">
            <span>Full Name</span>

            <strong>{getStudentName()}</strong>
          </div>

          <div className="student-detail-item">
            <span>Roll Number</span>

            <strong>{student.stdRollNo}</strong>
          </div>

          <div className="student-detail-item">
            <span>Email</span>

            <strong>{student.stdEmail || "-"}</strong>
          </div>

          <div className="student-detail-item">
            <span>Phone</span>

            <strong>{student.phone || "-"}</strong>
          </div>

          <div className="student-detail-item">
            <span>Gender</span>

            <strong>{student.gender || "-"}</strong>
          </div>

          <div className="student-detail-item">
            <span>Age</span>

            <strong>{student.age ?? "-"}</strong>
          </div>

          <div className="student-detail-item">
            <span>Department</span>

            <strong>{student.department?.name || "-"}</strong>
          </div>

          <div className="student-detail-item">
            <span>Course</span>

            <strong>{student.course?.name || "-"}</strong>
          </div>

          <div className="student-detail-item student-detail-full">
            <span>Address</span>

            <strong>{student.address || "-"}</strong>
          </div>
        </div>
      </section>

      {/* =====================================
          QUICK ACCESS
          ===================================== */}

      <section className="student-section">
        <div className="student-section-heading">
          <div>
            <h2>Academic Records</h2>

            <p>Access your academic information</p>
          </div>
        </div>

        <div className="student-quick-grid">
          {/* MARKS */}

          <div className="student-quick-card">
            <div className="student-quick-icon">📊</div>

            <div>
              <h3>My Marks</h3>

              <p>View your examination marks and results.</p>
            </div>

            <button onClick={() => navigate("/student/marks")}>
              View Marks →
            </button>
          </div>

          {/* ATTENDANCE */}

          <div className="student-quick-card">
            <div className="student-quick-icon">📅</div>

            <div>
              <h3>My Attendance</h3>

              <p>View your attendance records and status.</p>
            </div>

            <button onClick={() => navigate("/student/attendance")}>
              View Attendance →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StudentDashboard;
