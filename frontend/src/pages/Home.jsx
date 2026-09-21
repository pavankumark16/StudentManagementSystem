import "./Home.css";

function Home() {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="home-page">
      {/* ================= NAVBAR ================= */}
      <nav className="home-navbar">
        <div className="home-logo">
          <div className="home-logo-icon">🎓</div>

          <div>
            <h2>
              Student<span>Hub</span>
            </h2>
            <p>Management System</p>
          </div>
        </div>

        <div className="home-nav-links">
          <button onClick={() => scrollToSection("home")}>Home</button>

          <button onClick={() => scrollToSection("about")}>About</button>

          <button onClick={() => scrollToSection("features")}>Features</button>

          <a href="/login" className="home-login-button">
            Login
          </a>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section id="home" className="home-hero">
        <div className="home-hero-content">
          <div className="home-badge">
            <span>✦</span>
            Smart & Simple Student Management
          </div>

          <h1>
            Manage Students.
            <br />
            <span>Empower Education.</span>
          </h1>

          <p>
            A modern student management platform designed to simplify student
            records, attendance, marks, courses, faculty and academic management
            — all in one place.
          </p>

          <div className="home-hero-buttons">
            <a href="/login" className="home-primary-button">
              Get Started
              <span>→</span>
            </a>

            <button
              className="home-secondary-button"
              onClick={() => scrollToSection("about")}
            >
              Explore More
            </button>
          </div>

          <div className="home-trust">
            <div className="home-trust-avatars">
              <span>👨‍🎓</span>
              <span>👩‍🎓</span>
              <span>👨‍🏫</span>
              <span>👩‍🏫</span>
            </div>

            <div>
              <strong>Built for modern education</strong>
              <p>Students • Faculty • Administration</p>
            </div>
          </div>
        </div>

        {/* ================= HERO VISUAL ================= */}
        <div className="home-hero-visual">
          <div className="home-visual-glow"></div>

          <div className="home-dashboard-card">
            <div className="home-dashboard-top">
              <div>
                <span>Overview</span>
                <h3>Academic Dashboard</h3>
              </div>

              <div className="home-dashboard-menu">•••</div>
            </div>

            <div className="home-dashboard-stats">
              <div className="home-mini-card">
                <div className="home-mini-icon student-icon">👨‍🎓</div>

                <div>
                  <span>Students</span>
                  <strong>1,250+</strong>
                </div>
              </div>

              <div className="home-mini-card">
                <div className="home-mini-icon faculty-icon">👨‍🏫</div>

                <div>
                  <span>Faculty</span>
                  <strong>85+</strong>
                </div>
              </div>

              <div className="home-mini-card">
                <div className="home-mini-icon course-icon">📚</div>

                <div>
                  <span>Courses</span>
                  <strong>32+</strong>
                </div>
              </div>

              <div className="home-mini-card">
                <div className="home-mini-icon attendance-icon">✓</div>

                <div>
                  <span>Attendance</span>
                  <strong>94%</strong>
                </div>
              </div>
            </div>

            <div className="home-chart-card">
              <div className="home-chart-header">
                <div>
                  <span>Student Performance</span>
                  <strong>Academic Overview</strong>
                </div>

                <span className="home-chart-period">This Year</span>
              </div>

              <div className="home-chart">
                <div className="home-chart-bars">
                  <span style={{ height: "42%" }}></span>
                  <span style={{ height: "62%" }}></span>
                  <span style={{ height: "52%" }}></span>
                  <span style={{ height: "78%" }}></span>
                  <span style={{ height: "67%" }}></span>
                  <span style={{ height: "91%" }}></span>
                  <span style={{ height: "82%" }}></span>
                </div>

                <div className="home-chart-labels">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
              </div>
            </div>

            <div className="home-recent-card">
              <div className="home-recent-title">
                <strong>Recent Activity</strong>
                <span>View all</span>
              </div>

              <div className="home-activity">
                <div className="home-activity-icon">✓</div>

                <div>
                  <strong>Attendance updated</strong>
                  <span>Today's attendance has been recorded</span>
                </div>

                <small>2m</small>
              </div>

              <div className="home-activity">
                <div className="home-activity-icon">🎓</div>

                <div>
                  <strong>New student added</strong>
                  <span>Student profile successfully created</span>
                </div>

                <small>12m</small>
              </div>
            </div>
          </div>

          {/* Floating Cards */}

          <div className="home-floating-card home-floating-one">
            <div className="home-floating-icon">✓</div>

            <div>
              <strong>94%</strong>
              <span>Attendance</span>
            </div>
          </div>

          <div className="home-floating-card home-floating-two">
            <div className="home-floating-icon">📈</div>

            <div>
              <strong>+18.5%</strong>
              <span>Performance</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="home-about">
        <div className="home-section-heading">
          <div className="home-section-badge">ABOUT THE SYSTEM</div>

          <h2>
            Everything you need to manage
            <span> academic life.</span>
          </h2>

          <p>
            StudentHub brings students, faculty and administrators together
            through one simple and organized platform.
          </p>
        </div>

        <div className="home-about-content">
          <div className="home-about-visual">
            <div className="home-about-main-card">
              <div className="home-about-icon">🎓</div>

              <h3>
                One platform.
                <br />
                Complete control.
              </h3>

              <p>Keep academic information organized, accessible and secure.</p>
            </div>

            <div className="home-about-small-card">
              <span>⚡</span>
              <strong>Fast & Efficient</strong>
            </div>

            <div className="home-about-small-card second">
              <span>🔐</span>
              <strong>Secure Access</strong>
            </div>
          </div>

          <div className="home-about-text">
            <h3>Designed to make academic management easier.</h3>

            <p>
              Our Student Management System provides a centralized platform
              where administrators can manage students, faculty, departments,
              courses and subjects.
            </p>

            <p>
              Faculty members can manage attendance and academic records, while
              students can securely access their personal and academic
              information.
            </p>

            <div className="home-about-points">
              <div>
                <span>✓</span>
                <p>Centralized student records</p>
              </div>

              <div>
                <span>✓</span>
                <p>Role-based secure access</p>
              </div>

              <div>
                <span>✓</span>
                <p>Attendance & marks management</p>
              </div>

              <div>
                <span>✓</span>
                <p>Course & faculty management</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="home-features">
        <div className="home-section-heading">
          <div className="home-section-badge">POWERFUL FEATURES</div>

          <h2>
            Everything in one
            <span> intelligent system.</span>
          </h2>

          <p>Built to simplify everyday academic management.</p>
        </div>

        <div className="home-feature-grid">
          <div className="home-feature-card">
            <div className="home-feature-icon">👨‍🎓</div>

            <h3>Student Management</h3>

            <p>
              Create, update and manage student profiles and academic
              information efficiently.
            </p>

            <span className="home-feature-arrow">→</span>
          </div>

          <div className="home-feature-card">
            <div className="home-feature-icon">📅</div>

            <h3>Attendance Tracking</h3>

            <p>
              Record and monitor student attendance with a simple and organized
              workflow.
            </p>

            <span className="home-feature-arrow">→</span>
          </div>

          <div className="home-feature-card">
            <div className="home-feature-icon">📊</div>

            <h3>Marks & Results</h3>

            <p>
              Manage academic marks and provide students with easy access to
              their results.
            </p>

            <span className="home-feature-arrow">→</span>
          </div>

          <div className="home-feature-card">
            <div className="home-feature-icon">👨‍🏫</div>

            <h3>Faculty Management</h3>

            <p>
              Maintain faculty information and organize academic
              responsibilities.
            </p>

            <span className="home-feature-arrow">→</span>
          </div>

          <div className="home-feature-card">
            <div className="home-feature-icon">📚</div>

            <h3>Courses & Subjects</h3>

            <p>
              Manage departments, courses and subjects from one centralized
              platform.
            </p>

            <span className="home-feature-arrow">→</span>
          </div>

          <div className="home-feature-card">
            <div className="home-feature-icon">🔐</div>

            <h3>Secure Authentication</h3>

            <p>
              Role-based access ensures every user sees only the information
              they need.
            </p>

            <span className="home-feature-arrow">→</span>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="home-cta">
        <div className="home-cta-content">
          <div className="home-cta-icon">🎓</div>

          <h2>
            Ready to simplify
            <span> student management?</span>
          </h2>

          <p>
            Access your dashboard and experience a smarter way to manage
            academic information.
          </p>

          <a href="/login" className="home-primary-button">
            Login to System
            <span>→</span>
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="home-footer">
        <div className="home-footer-logo">
          <div className="home-logo-icon">🎓</div>

          <div>
            <h3>
              Student<span>Hub</span>
            </h3>
            <p>Management System</p>
          </div>
        </div>

        <p>© 2026 StudentHub. Student Management System.</p>

        <div className="home-footer-links">
          <button onClick={() => scrollToSection("home")}>Home</button>

          <button onClick={() => scrollToSection("about")}>About</button>

          <a href="/login">Login</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
