import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import "./StudentMarks.css";

function StudentMarks({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMarks = async () => {
      try {
        const data = await apiRequest("/marks/me");

        setMarks(data);
      } catch (error) {
        console.error(error);

        setError("Unable to load your marks");
      } finally {
        setLoading(false);
      }
    };

    loadMarks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  const getStudentName = () => {
    if (marks.length === 0 || !marks[0].student) {
      return "Student";
    }

    const student = marks[0].student;

    return [student.firstName, student.middleName, student.lastName]
      .filter(Boolean)
      .join(" ");
  };

  const getTotalMarks = () => {
    return marks.reduce((total, item) => total + (item.marks || 0), 0);
  };

  const getAverageMarks = () => {
    if (marks.length === 0) {
      return 0;
    }

    return (getTotalMarks() / marks.length).toFixed(1);
  };

  const getHighestMarks = () => {
    if (marks.length === 0) {
      return 0;
    }

    return Math.max(...marks.map((item) => item.marks || 0));
  };

  if (loading) {
    return (
      <div className="student-marks-loading">
        <div className="student-marks-spinner"></div>

        <p>Loading your marks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="student-marks-error">
        <div className="student-marks-error-card">
          <div className="student-marks-error-icon">!</div>

          <h2>Unable to Load Marks</h2>

          <p>{error}</p>

          <button onClick={() => navigate("/student")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="student-marks-page">
      {/* HEADER */}

      <header className="student-marks-header">
        <div>
          <div className="student-marks-title-row">
            <button
              className="student-marks-back-button"
              onClick={() => navigate("/student")}
            >
              ←
            </button>

            <div>
              <h1>My Marks</h1>

              <p>View your examination results</p>
            </div>
          </div>
        </div>

        <div className="student-marks-actions">
          <button className="student-marks-theme-button" onClick={toggleTheme}>
            <span>{theme === "light" ? "☾" : "☀"}</span>

            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

          <button
            className="student-marks-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* STUDENT INFORMATION */}

      <section className="student-marks-profile">
        <div>
          <span>STUDENT</span>

          <h2>{getStudentName()}</h2>

          {marks.length > 0 && marks[0].student && (
            <p>
              Roll Number: <strong>{marks[0].student.stdRollNo}</strong>
            </p>
          )}
        </div>
      </section>

      {/* SUMMARY */}

      <section className="student-marks-summary">
        <div className="student-marks-summary-card">
          <div className="student-marks-summary-icon">📚</div>

          <div>
            <span>Total Exams</span>

            <strong>{marks.length}</strong>
          </div>
        </div>

        <div className="student-marks-summary-card">
          <div className="student-marks-summary-icon">📊</div>

          <div>
            <span>Total Marks</span>

            <strong>{getTotalMarks()}</strong>
          </div>
        </div>

        <div className="student-marks-summary-card">
          <div className="student-marks-summary-icon">📈</div>

          <div>
            <span>Average</span>

            <strong>{getAverageMarks()}</strong>
          </div>
        </div>

        <div className="student-marks-summary-card">
          <div className="student-marks-summary-icon">🏆</div>

          <div>
            <span>Highest Marks</span>

            <strong>{getHighestMarks()}</strong>
          </div>
        </div>
      </section>

      {/* MARKS TABLE */}

      <section className="student-marks-section">
        <div className="student-marks-section-heading">
          <div>
            <h2>Examination Results</h2>

            <p>Your recorded examination marks</p>
          </div>
        </div>

        {marks.length === 0 ? (
          <div className="student-marks-empty">
            <div className="student-marks-empty-icon">📋</div>

            <h3>No Marks Available</h3>

            <p>Your examination marks have not been recorded yet.</p>
          </div>
        ) : (
          <div className="student-marks-table-container">
            <table className="student-marks-table">
              <thead>
                <tr>
                  <th>#</th>

                  <th>Subject</th>

                  <th>Code</th>

                  <th>Exam Type</th>

                  <th>Marks</th>

                  <th>Credits</th>

                  <th>Faculty</th>
                </tr>
              </thead>

              <tbody>
                {marks.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    <td>
                      <strong>{item.subject?.name || "-"}</strong>
                    </td>

                    <td>{item.subject?.code || "-"}</td>

                    <td>
                      <span className="student-exam-badge">
                        {item.examType || "-"}
                      </span>
                    </td>

                    <td>
                      <span className="student-mark-value">
                        {item.marks ?? "-"}
                      </span>
                    </td>

                    <td>{item.subject?.credits ?? "-"}</td>

                    <td>
                      {item.faculty
                        ? `${item.faculty.firstName || ""} ${item.faculty.lastName || ""}`.trim()
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

export default StudentMarks;
