import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import Notification from "../components/Notification";
import "./Departments.css";

function Departments({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [notification, setNotification] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const [departmentName, setDepartmentName] = useState("");

  /* =========================
     LOAD DEPARTMENTS
  ========================= */

  useEffect(() => {
    loadDepartments();
  }, []);

  /* =========================
     NOTIFICATION
  ========================= */

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => {
      setNotification(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [notification]);

  const loadDepartments = async () => {
    try {
      const data = await apiRequest("/departments");

      setDepartments(data);
    } catch (error) {
      console.error("Failed to load departments:", error);

      setNotification({
        type: "error",
        message: "Failed to load departments",
      });
    }
  };

  /* =========================
     OPEN ADD MODAL
  ========================= */

  const openAddModal = () => {
    setEditingDepartment(null);
    setDepartmentName("");
    setShowModal(true);
  };

  /* =========================
     OPEN EDIT MODAL
  ========================= */

  const openEditModal = (department) => {
    setEditingDepartment(department);
    setDepartmentName(department.name || "");
    setShowModal(true);
  };

  /* =========================
     CLOSE MODAL
  ========================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingDepartment(null);
    setDepartmentName("");
  };

  /* =========================
     ADD / UPDATE
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = departmentName.trim();

    if (!trimmedName) {
      setNotification({
        type: "error",
        message: "Please enter department name",
      });

      return;
    }

    try {
      if (editingDepartment) {
        await apiRequest(`/departments/${editingDepartment.id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: trimmedName,
          }),
        });

        setNotification({
          type: "success",
          message: "Department updated successfully",
        });
      } else {
        await apiRequest("/departments", {
          method: "POST",
          body: JSON.stringify({
            name: trimmedName,
          }),
        });

        setNotification({
          type: "success",
          message: "Department added successfully",
        });
      }

      closeModal();
      loadDepartments();
    } catch (error) {
      console.error("Failed to save department:", error);

      setNotification({
        type: "error",
        message: editingDepartment
          ? "Failed to update department"
          : "Failed to add department",
      });
    }
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiRequest(`/departments/${id}`, {
        method: "DELETE",
      });

      setNotification({
        type: "success",
        message: "Department deleted successfully",
      });

      loadDepartments();
    } catch (error) {
      console.error("Failed to delete department:", error);

      setNotification({
        type: "error",
        message: "Failed to delete department",
      });
    }
  };

  /* =========================
     SEARCH
  ========================= */

  const filteredDepartments = departments.filter((department) => {
    const name = department.name?.toLowerCase() || "";
    const id = String(department.id || "");

    const search = searchTerm.toLowerCase();

    return name.includes(search) || id.includes(search);
  });

  return (
    <div className="departments-page">
      {/* =========================
          NOTIFICATION
      ========================= */}

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* =========================
          ADD / EDIT MODAL
      ========================= */}

      {showModal && (
        <div className="departments-modal-overlay" onClick={closeModal}>
          <div
            className="departments-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="departments-modal-header">
              <div>
                <h2>
                  {editingDepartment ? "Edit Department" : "Add Department"}
                </h2>

                <p>
                  {editingDepartment
                    ? "Update department information"
                    : "Create a new academic department"}
                </p>
              </div>

              <button className="departments-modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <form className="departments-form" onSubmit={handleSubmit}>
              <div className="departments-form-group">
                <label>Department Name</label>

                <input
                  type="text"
                  placeholder="Enter department name"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="departments-modal-footer">
                <button
                  type="button"
                  className="departments-cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="departments-save-button">
                  {editingDepartment ? "Update Department" : "Add Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          HEADER
      ========================= */}

      <div className="departments-header">
        <div className="departments-header-title">
          <button
            className="departments-back-button"
            onClick={() => navigate("/admin")}
          >
            ←
          </button>

          <div>
            <h1>Departments</h1>
            <p>Manage academic departments</p>
          </div>
        </div>

        <div className="departments-header-actions">
          <button className="departments-theme-button" onClick={toggleTheme}>
            <span className="departments-theme-icon">
              {theme === "light" ? "☾" : "☀"}
            </span>

            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>
      </div>

      {/* =========================
          TOOLBAR
      ========================= */}

      <div className="departments-toolbar">
        <div className="departments-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="departments-toolbar-right">
          <div className="departments-count">
            {filteredDepartments.length}{" "}
            {filteredDepartments.length === 1 ? "Department" : "Departments"}
          </div>

          <button className="departments-add-button" onClick={openAddModal}>
            + Add Department
          </button>
        </div>
      </div>

      {/* =========================
          TABLE
      ========================= */}

      <div className="departments-table-container">
        <table className="departments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDepartments.length === 0 ? (
              <tr>
                <td colSpan="3" className="departments-empty">
                  No departments found.
                </td>
              </tr>
            ) : (
              filteredDepartments.map((department) => (
                <tr key={department.id}>
                  <td>
                    <span className="department-id">#{department.id}</span>
                  </td>

                  <td>
                    <div className="department-name-wrapper">
                      <div className="department-icon">⌂</div>

                      <span className="department-name">{department.name}</span>
                    </div>
                  </td>

                  <td>
                    <div className="departments-actions">
                      <button
                        className="departments-edit-button"
                        onClick={() => openEditModal(department)}
                      >
                        Edit
                      </button>

                      <button
                        className="departments-delete-button"
                        onClick={() => handleDelete(department.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Departments;
