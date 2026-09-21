import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();

      console.log("Login response:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else if (data.role === "ROLE_FACULTY") {
        navigate("/faculty");
      } else if (data.role === "ROLE_STUDENT") {
        navigate("/student");
      }
    } catch (error) {
      console.error(error);
      setLoginError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div className="login-bg-circle login-bg-circle-one"></div>
      <div className="login-bg-circle login-bg-circle-two"></div>

      {/* Main content */}
      <main className="login-container">
        {/* Brand */}
        <div className="login-brand">
          <div className="login-brand-logo">SM</div>

          <div className="login-brand-text">
            <h1>Student Management System</h1>
            <p>Manage. Learn. Succeed.</p>
          </div>
        </div>

        {/* Login Card */}
        <section className="login-card">
          <div className="login-card-header">
            <div className="login-card-icon">→</div>

            <h2>Welcome back</h2>

            <p>Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Username */}
            <div className="login-form-group">
              <label htmlFor="username">Username</label>

              <div className="login-input-wrapper">
                <span className="login-input-icon">👤</span>

                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setLoginError("");
                  }}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-form-group">
              <div className="login-password-header">
                <label htmlFor="password">Password</label>

                <button
                  type="button"
                  className="login-forgot"
                  onClick={() =>
                    alert(
                      "Please contact the administrator to reset your password.",
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>

              <div className="login-input-wrapper">
                <span className="login-input-icon">🔒</span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError("");
                  }}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Login Error */}
            {loginError && (
              <div className="login-error-message">⚠ {loginError}</div>
            )}

            {/* Options */}
            <div className="login-options">
              <label className="login-remember">
                <input type="checkbox" />

                <span>Remember me</span>
              </label>
            </div>

            {/* Login button */}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="login-spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <span className="login-arrow">→</span>
                </>
              )}
            </button>
          </form>

          {/* Security */}
          <div className="login-security">
            <div className="login-security-icon">🔐</div>

            <div>
              <strong>Secure authentication</strong>

              <span>Your account is protected with JWT security</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="login-footer">
          © 2026 Student Management System
        </footer>
      </main>
    </div>
  );
}

export default Login;
