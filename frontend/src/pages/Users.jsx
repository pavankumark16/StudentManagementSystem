import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import Notification from "../components/Notification";
import "./Users.css";

function Users({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "STUDENT",
    facultyId: "",
    studentId: "",
  });

  const [faculties, setFaculties] = useState([]);
  const [students, setStudents] = useState([]);

  /* =========================================
     LOAD DATA
     ========================================= */

  useEffect(() => {
    loadUsers();
    loadFaculties();
    loadStudents();
  }, []);

  /* =========================================
     NOTIFICATION AUTO CLOSE
     ========================================= */

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => {
      setNotification(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [notification]);

  /* =========================================
     LOAD USERS
     ========================================= */

  const loadUsers = async () => {
    try {
      const data = await apiRequest("/users");
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);

      setNotification({
        type: "error",
        message: "Failed to load users",
      });
    }
  };

  /* =========================================
     LOAD FACULTIES
     ========================================= */

  const loadFaculties = async () => {
    try {
      const data = await apiRequest("/faculties");
      setFaculties(data);
    } catch (error) {
      console.error("Failed to load faculties:", error);
    }
  };

  /* =========================================
     LOAD STUDENTS
     ========================================= */

  const loadStudents = async () => {
    try {
      const data = await apiRequest("/students");
      setStudents(data);
    } catch (error) {
      console.error("Failed to load students:", error);
    }
  };

  /* =========================================
     FILTER USERS
     ========================================= */

  const filteredUsers = users.filter((user) => {
    const linkedPerson =
      user.role === "FACULTY" && user.faculty
        ? `${user.faculty.firstName} ${user.faculty.lastName}`
        : user.role === "STUDENT" && user.student
          ? `${user.student.firstName} ${user.student.lastName}`
          : "";

    return `${user.id} ${user.username} ${user.role} ${linkedPerson}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  /* =========================================
     CREATE USER
     ========================================= */

  const handleCreateUser = async () => {
    if (!newUser.username.trim()) {
      setNotification({
        type: "error",
        message: "Please enter username.",
      });
      return;
    }

    if (!newUser.password.trim()) {
      setNotification({
        type: "error",
        message: "Please enter password.",
      });
      return;
    }

    if (newUser.role === "FACULTY" && !newUser.facultyId) {
      setNotification({
        type: "error",
        message: "Please select a faculty.",
      });
      return;
    }

    if (newUser.role === "STUDENT" && !newUser.studentId) {
      setNotification({
        type: "error",
        message: "Please select a student.",
      });
      return;
    }

    const payload = {
      username: newUser.username.trim(),
      password: newUser.password,
      role: newUser.role,
    };

    if (newUser.role === "FACULTY") {
      payload.faculty = {
        id: Number(newUser.facultyId),
      };
    }

    if (newUser.role === "STUDENT") {
      payload.student = {
        stdRollNo: Number(newUser.studentId),
      };
    }

    try {
      await apiRequest("/users", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setShowCreateUserModal(false);

      setNewUser({
        username: "",
        password: "",
        role: "STUDENT",
        facultyId: "",
        studentId: "",
      });

      setNotification({
        type: "success",
        message: "User created successfully.",
      });

      await loadUsers();
    } catch (error) {
      console.error("Failed to create user:", error);

      setNotification({
        type: "error",
        message: "Failed to create user.",
      });
    }
  };

  /* =========================================
     RENDER
     ========================================= */

  return (
    <div className="users-page">
      {/* NOTIFICATION */}

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* HEADER */}

      <div className="users-header">
        <div className="users-header-title">
          <button
            className="users-back-button"
            onClick={() => navigate("/admin")}
          >
            ←
          </button>

          <div>
            <h1>Users</h1>
            <p>View and manage system users</p>
          </div>
        </div>

        <div className="users-header-actions">
          <button
            className="users-add-button"
            onClick={() => setShowCreateUserModal(true)}
          >
            + Create User
          </button>

          <button className="users-theme-button" onClick={toggleTheme}>
            <span className="users-theme-icon">
              {theme === "light" ? "☾" : "☀"}
            </span>

            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>
      </div>

      {/* TOOLBAR */}

      <div className="users-toolbar">
        <div className="users-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="users-count">{filteredUsers.length} users</div>
      </div>

      {/* USERS TABLE */}

      <div className="users-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Linked Person</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const linkedPerson =
                  user.role === "FACULTY" && user.faculty
                    ? `${user.faculty.firstName} ${user.faculty.lastName}`
                    : user.role === "STUDENT" && user.student
                      ? `${user.student.firstName} ${user.student.lastName}`
                      : "-";

                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>

                    <td>
                      <span className="users-username">{user.username}</span>
                    </td>

                    <td>
                      <span
                        className={`users-role ${user.role?.toLowerCase()}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>{linkedPerson}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="users-empty">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE USER MODAL */}

      {showCreateUserModal && (
        <div
          className="users-modal-overlay"
          onClick={() => setShowCreateUserModal(false)}
        >
          <div className="users-modal" onClick={(e) => e.stopPropagation()}>
            {/* MODAL HEADER */}

            <div className="users-modal-header">
              <div>
                <h2>Create User</h2>

                <p>Create a login account for Admin, Faculty or Student.</p>
              </div>

              <button
                className="users-modal-close"
                onClick={() => setShowCreateUserModal(false)}
              >
                ×
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="users-modal-body">
              {/* USERNAME */}

              <div className="users-form-group">
                <label>Username</label>

                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      username: e.target.value,
                    })
                  }
                  placeholder="Enter username"
                />
              </div>

              {/* PASSWORD */}

              <div className="users-form-group">
                <label>Password</label>

                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      password: e.target.value,
                    })
                  }
                  placeholder="Enter password"
                />
              </div>

              {/* ROLE */}

              <div className="users-form-group">
                <label>Role</label>

                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      role: e.target.value,
                      facultyId: "",
                      studentId: "",
                    })
                  }
                >
                  <option value="ADMIN">Admin</option>

                  <option value="FACULTY">Faculty</option>

                  <option value="STUDENT">Student</option>
                </select>
              </div>

              {/* FACULTY */}

              {newUser.role === "FACULTY" && (
                <div className="users-form-group">
                  <label>Faculty</label>

                  <select
                    value={newUser.facultyId}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        facultyId: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Faculty</option>

                    {faculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.firstName} {faculty.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* STUDENT */}

              {newUser.role === "STUDENT" && (
                <div className="users-form-group">
                  <label>Student</label>

                  <select
                    value={newUser.studentId}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        studentId: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Student</option>

                    {students.map((student) => (
                      <option key={student.stdRollNo} value={student.stdRollNo}>
                        {student.firstName} {student.lastName} (Roll:{" "}
                        {student.stdRollNo})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}

            <div className="users-modal-footer">
              <button
                className="users-cancel-button"
                onClick={() => setShowCreateUserModal(false)}
              >
                Cancel
              </button>

              <button className="users-save-button" onClick={handleCreateUser}>
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
