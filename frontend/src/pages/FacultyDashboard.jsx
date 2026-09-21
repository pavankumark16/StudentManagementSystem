import { useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";

function FacultyDashboard({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <div className="faculty-dashboard">
      {/* HEADER */}

      <header className="faculty-dashboard-header">
        <div>
          <h1>Faculty Dashboard</h1>
          <p>Manage students, attendance and marks</p>
        </div>

        <div className="faculty-dashboard-actions">
          <button
            className="faculty-dashboard-theme-button"
            onClick={toggleTheme}
          >
            <span>{theme === "light" ? "☾" : "☀"}</span>

            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

          <button className="faculty-dashboard-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* WELCOME */}

      <section className="faculty-welcome-card">
        <div>
          <h2>Welcome, Faculty</h2>

          <p>
            Use the options below to manage your assigned academic activities.
          </p>
        </div>
      </section>

      {/* FACULTY OPTIONS */}

      <section className="faculty-dashboard-section">
        <h2>Faculty Operations</h2>

        <div className="faculty-dashboard-grid">
          {/* STUDENTS */}

          <div
            className="faculty-dashboard-card"
            onClick={() => navigate("/students")}
          >
            <div className="faculty-dashboard-card-icon">👨‍🎓</div>

            <h3>Students</h3>

            <p>View student records and student information.</p>

            <button>View Students →</button>
          </div>

          {/* ATTENDANCE */}

          <div
            className="faculty-dashboard-card"
            onClick={() => navigate("/attendance")}
          >
            <div className="faculty-dashboard-card-icon">📅</div>
            <h3>Attendance</h3>
            <p>Mark and manage student attendance.</p>
            <button>Manage Attendance →</button>
          </div>

          {/* MARKS */}

          {/* MARKS */}

          <div
            className="faculty-dashboard-card"
            onClick={() => navigate("/marks")}
          >
            {" "}
            <div className="faculty-dashboard-card-icon">📊</div>
            <h3>Marks</h3>
            <p>Enter and manage student marks.</p>
            <button>Manage Marks →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FacultyDashboard;
