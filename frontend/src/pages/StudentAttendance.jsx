import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import "./StudentAttendance.css";

function StudentAttendance({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const data = await apiRequest("/attendances/me");
        setAttendance(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load your attendance");
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const getStudentName = () => {
    if (attendance.length === 0 || !attendance[0].student) {
      return "Student";
    }

    const student = attendance[0].student;

    return [student.firstName, student.middleName, student.lastName]
      .filter(Boolean)
      .join(" ");
  };

  const getTotalClasses = () => {
    return attendance.length;
  };

  const getPresentCount = () => {
    return attendance.filter((item) => item.status?.toLowerCase() === "present")
      .length;
  };

  const getAbsentCount = () => {
    return attendance.filter((item) => item.status?.toLowerCase() === "absent")
      .length;
  };

  const getAttendancePercentage = () => {
    if (attendance.length === 0) {
      return 0;
    }

    return ((getPresentCount() / attendance.length) * 100).toFixed(1);
  };

  const getStatusClass = (status) => {
    const value = status?.toLowerCase();

    if (value === "present") {
      return "student-attendance-status present";
    }

    if (value === "absent") {
      return "student-attendance-status absent";
    }

    return "student-attendance-status";
  };

  if (loading) {
    return (
      <div className="student-attendance-loading">
        <div className="student-attendance-spinner"></div>
        <p>Loading your attendance...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="student-attendance-error">
        <div className="student-attendance-error-card">
          <div className="student-attendance-error-icon">!</div>

          <h2>Unable to Load Attendance</h2>

          <p>{error}</p>

          <button onClick={() => navigate("/student")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="student-attendance-page">
      {/* Header */}
      <header className="student-attendance-header">
        <div>
          <div className="student-attendance-title-row">
            <button
              className="student-attendance-back-button"
              onClick={() => navigate("/student")}
            >
              ←
            </button>

            <div>
              <h1>My Attendance</h1>
              <p>View your attendance records</p>
            </div>
          </div>
        </div>

        <div className="student-attendance-actions">
          <button
            className="student-attendance-theme-button"
            onClick={toggleTheme}
          >
            <span>{theme === "light" ? "☾" : "☀"}</span>

            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

          <button
            className="student-attendance-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Student Profile */}
      <section className="student-attendance-profile">
        <div>
          <span>STUDENT</span>

          <h2>{getStudentName()}</h2>

          {attendance.length > 0 && attendance[0].student && (
            <p>
              Roll Number: <strong>{attendance[0].student.stdRollNo}</strong>
            </p>
          )}
        </div>
      </section>

      {/* Summary */}
      <section className="student-attendance-summary">
        <div className="student-attendance-summary-card">
          <div className="student-attendance-summary-icon">📚</div>

          <div>
            <span>Total Classes</span>
            <strong>{getTotalClasses()}</strong>
          </div>
        </div>

        <div className="student-attendance-summary-card">
          <div className="student-attendance-summary-icon">✓</div>

          <div>
            <span>Present</span>
            <strong>{getPresentCount()}</strong>
          </div>
        </div>

        <div className="student-attendance-summary-card">
          <div className="student-attendance-summary-icon">✕</div>

          <div>
            <span>Absent</span>
            <strong>{getAbsentCount()}</strong>
          </div>
        </div>

        <div className="student-attendance-summary-card">
          <div className="student-attendance-summary-icon">📊</div>

          <div>
            <span>Attendance</span>
            <strong>{getAttendancePercentage()}%</strong>
          </div>
        </div>
      </section>

      {/* Attendance Records */}
      <section className="student-attendance-section">
        <div className="student-attendance-section-heading">
          <div>
            <h2>Attendance Records</h2>

            <p>Your recorded attendance history</p>
          </div>
        </div>

        {attendance.length === 0 ? (
          <div className="student-attendance-empty">
            <div className="student-attendance-empty-icon">📋</div>

            <h3>No Attendance Available</h3>

            <p>Your attendance records have not been recorded yet.</p>
          </div>
        ) : (
          <div className="student-attendance-table-container">
            <table className="student-attendance-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Code</th>
                  <th>Status</th>
                  <th>Faculty</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    <td>{item.attendanceDate || "-"}</td>

                    <td>
                      <strong>{item.subject?.name || "-"}</strong>
                    </td>

                    <td>{item.subject?.code || "-"}</td>

                    <td>
                      <span className={getStatusClass(item.status)}>
                        {item.status || "-"}
                      </span>
                    </td>

                    <td>
                      {item.faculty
                        ? `${item.faculty.firstName || ""} ${
                            item.faculty.lastName || ""
                          }`.trim()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default StudentAttendance;
