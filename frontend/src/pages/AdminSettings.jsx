import { useNavigate } from "react-router-dom";
import "./AdminSettings.css";

function AdminSettings({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="admin-settings-page">
      {/* Header */}
      <header className="admin-settings-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your system preferences and account settings</p>
        </div>

        <div className="admin-settings-actions">
          <button className="admin-settings-theme-button" onClick={toggleTheme}>
            <span>{theme === "light" ? "☾" : "☀"}</span>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

          <button className="admin-settings-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Appearance */}
      <section className="admin-settings-card">
        <div className="admin-settings-card-title">
          <h2>Appearance</h2>
          <p>Customize how the application looks.</p>
        </div>

        <div className="admin-settings-option">
          <div>
            <h3>Theme</h3>
            <p>Choose between light mode and dark mode.</p>
          </div>

          <button
            className="admin-settings-option-button"
            onClick={toggleTheme}
          >
            {theme === "light" ? "☾ Dark Mode" : "☀ Light Mode"}
          </button>
        </div>
      </section>

      {/* Account */}
      <section className="admin-settings-card">
        <div className="admin-settings-card-title">
          <h2>Account</h2>
          <p>Manage your administrator account.</p>
        </div>

        <div className="admin-settings-option">
          <div>
            <h3>My Profile</h3>
            <p>View your administrator information and change your password.</p>
          </div>

          <button
            className="admin-settings-option-button"
            onClick={() => navigate("/admin/profile")}
          >
            View Profile →
          </button>
        </div>
      </section>

      {/* System Information */}
      <section className="admin-settings-card">
        <div className="admin-settings-card-title">
          <h2>System Information</h2>
          <p>Information about the Student Management System.</p>
        </div>

        <div className="admin-settings-info-grid">
          <div className="admin-settings-info">
            <span>Application Name</span>
            <strong>Student Management System</strong>
          </div>

          <div className="admin-settings-info">
            <span>Application Version</span>
            <strong>1.0.0</strong>
          </div>

          <div className="admin-settings-info">
            <span>Backend</span>
            <strong>Spring Boot</strong>
          </div>

          <div className="admin-settings-info">
            <span>Database</span>
            <strong>MySQL</strong>
          </div>
        </div>
      </section>

      {/* Back */}
      <button
        className="admin-settings-back"
        onClick={() => navigate("/admin")}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

export default AdminSettings;
