import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import Notification from "../components/Notification";
import "./AdminProfile.css";

function AdminProfile({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [notification, setNotification] = useState(null);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [notification]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleChangePassword = async () => {
    if (!currentPassword.trim()) {
      setNotification({
        type: "error",
        message: "Please enter your current password.",
      });
      return;
    }

    if (!newPassword.trim()) {
      setNotification({
        type: "error",
        message: "Please enter your new password.",
      });
      return;
    }

    if (newPassword.length < 6) {
      setNotification({
        type: "error",
        message: "New password must contain at least 6 characters.",
      });
      return;
    }

    if (!confirmPassword.trim()) {
      setNotification({
        type: "error",
        message: "Please confirm your new password.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setNotification({
        type: "error",
        message: "New password and confirm password do not match.",
      });
      return;
    }

    try {
      setChangingPassword(true);

      await apiRequest("/users/change-password", {
        method: "PUT",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setNotification({
        type: "success",
        message: "Password changed successfully.",
      });
    } catch (error) {
      console.error("Failed to change password:", error);

      setNotification({
        type: "error",
        message: error.message || "Failed to change password.",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="admin-profile-page">
      {/* Notification */}
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}

      {/* Header */}
      <header className="admin-profile-header">
        <div>
          <h1>My Profile</h1>
          <p>View your administrator account information</p>
        </div>

        <div className="admin-profile-actions">
          <button className="admin-profile-theme-button" onClick={toggleTheme}>
            <span>{theme === "light" ? "☾" : "☀"}</span>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

          <button className="admin-profile-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Profile Card */}
      <section className="admin-profile-card">
        <div className="admin-profile-card-header">
          <div className="admin-profile-avatar">A</div>

          <div>
            <h2>Administrator</h2>
            <p>System Administrator</p>
          </div>
        </div>

        <div className="admin-profile-details">
          <div className="admin-profile-detail">
            <span>Username</span>
            <strong>admin</strong>
          </div>

          <div className="admin-profile-detail">
            <span>Role</span>
            <strong>ADMIN</strong>
          </div>

          <div className="admin-profile-detail">
            <span>Account Type</span>
            <strong>Administrator</strong>
          </div>

          <div className="admin-profile-detail">
            <span>Access Level</span>
            <strong>Full System Access</strong>
          </div>
        </div>
      </section>

      {/* Access Information */}
      <section className="admin-profile-access">
        <h2>Administrator Responsibilities</h2>

        <div className="admin-profile-access-grid">
          <div className="admin-profile-access-item">
            <span>✓</span>
            <div>
              <h3>Student Management</h3>
              <p>Add, update, view and delete student records.</p>
            </div>
          </div>

          <div className="admin-profile-access-item">
            <span>✓</span>
            <div>
              <h3>Faculty Management</h3>
              <p>Add and manage faculty records.</p>
            </div>
          </div>

          <div className="admin-profile-access-item">
            <span>✓</span>
            <div>
              <h3>Academic Management</h3>
              <p>Manage departments, courses and subjects.</p>
            </div>
          </div>

          <div className="admin-profile-access-item">
            <span>✓</span>
            <div>
              <h3>User Management</h3>
              <p>Create and manage system user accounts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Change Password */}
      <section className="admin-profile-password">
        <div className="admin-profile-password-header">
          <div>
            <h2>Change Password</h2>
            <p>Update your administrator account password.</p>
          </div>
        </div>

        <div className="admin-profile-password-form">
          <div className="admin-profile-password-field">
            <label>Current Password</label>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>

          <div className="admin-profile-password-field">
            <label>New Password</label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div className="admin-profile-password-field">
            <label>Confirm New Password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <button
          className="admin-profile-password-button"
          onClick={handleChangePassword}
          disabled={changingPassword}
        >
          {changingPassword ? "Changing Password..." : "Change Password"}
        </button>
      </section>

      {/* Back */}
      <button className="admin-profile-back" onClick={() => navigate("/admin")}>
        ← Back to Dashboard
      </button>
    </div>
  );
}

export default AdminProfile;
