import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import Notification from "../components/Notification";
import "./Courses.css";

function Courses({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [notification, setNotification] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (location.state?.openAddCourse) {
      openAddModal();

      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => {
      setNotification(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [notification]);

  const loadCourses = async () => {
    try {
      const data = await apiRequest("/courses");
      setCourses(data);
    } catch (error) {
      console.error("Failed to load courses:", error);

      setNotification({
        type: "error",
        message: "Failed to load courses",
      });
    }
  };

  const openAddModal = () => {
    setEditingCourse(null);
    setCourseName("");
    setCourseDuration("");
    setShowModal(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setCourseName(course.name || "");
    setCourseDuration(course.duration || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCourse(null);
    setCourseName("");
    setCourseDuration("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = courseName.trim();
    const trimmedDuration = courseDuration.trim();

    if (!trimmedName) {
      setNotification({
        type: "error",
        message: "Please enter course name",
      });
      return;
    }

    if (!trimmedDuration) {
      setNotification({
        type: "error",
        message: "Please enter course duration",
      });
      return;
    }

    try {
      const payload = {
        name: trimmedName,
        duration: trimmedDuration,
      };

      if (editingCourse) {
        await apiRequest(`/courses/${editingCourse.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        setNotification({
          type: "success",
          message: "Course updated successfully",
        });
      } else {
        await apiRequest("/courses", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        setNotification({
          type: "success",
          message: "Course added successfully",
        });
      }

      closeModal();
      loadCourses();
    } catch (error) {
      console.error("Failed to save course:", error);

      setNotification({
        type: "error",
        message: editingCourse
          ? "Failed to update course"
          : "Failed to add course",
      });
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiRequest(`/courses/${id}`, {
        method: "DELETE",
      });

      setNotification({
        type: "success",
        message: "Course deleted successfully",
      });

      loadCourses();
    } catch (error) {
      console.error("Failed to delete course:", error);

      setNotification({
        type: "error",
        message: "Failed to delete course",
      });
    }
  };

  const filteredCourses = courses.filter((course) => {
    const name = course.name?.toLowerCase() || "";
    const duration = String(course.duration || "").toLowerCase();
    const id = String(course.id || "");

    const search = searchTerm.toLowerCase();

    return (
      name.includes(search) || duration.includes(search) || id.includes(search)
    );
  });

  return (
    <div className="courses-page">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {showModal && (
        <div className="courses-modal-overlay" onClick={closeModal}>
          <div className="courses-modal" onClick={(e) => e.stopPropagation()}>
            <div className="courses-modal-header">
              <div>
                <h2>{editingCourse ? "Edit Course" : "Add Course"}</h2>

                <p>
                  {editingCourse
                    ? "Update course information"
                    : "Create a new academic course"}
                </p>
              </div>

              <button className="courses-modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <form className="courses-form" onSubmit={handleSubmit}>
              <div className="courses-form-group">
                <label>Course Name</label>

                <input
                  type="text"
                  placeholder="Enter course name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="courses-form-group">
                <label>Duration</label>

                <input
                  type="text"
                  placeholder="Example: 6 Months"
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(e.target.value)}
                />
              </div>

              <div className="courses-modal-footer">
                <button
                  type="button"
                  className="courses-cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="courses-save-button">
                  {editingCourse ? "Update Course" : "Add Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="courses-header">
        <div className="courses-header-title">
          <button
            className="courses-back-button"
            onClick={() => navigate("/admin")}
          >
            ←
          </button>

          <div>
            <h1>Courses</h1>
            <p>Manage academic courses</p>
          </div>
        </div>

        <div className="courses-header-actions">
          <button className="courses-theme-button" onClick={toggleTheme}>
            <span className="courses-theme-icon">
              {theme === "light" ? "☾" : "☀"}
            </span>

            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>
      </div>

      <div className="courses-toolbar">
        <div className="courses-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="courses-toolbar-right">
          <div className="courses-count">
            {filteredCourses.length}{" "}
            {filteredCourses.length === 1 ? "Course" : "Courses"}
          </div>

          <button className="courses-add-button" onClick={openAddModal}>
            + Add Course
          </button>
        </div>
      </div>

      <div className="courses-table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCourses.length === 0 ? (
              <tr>
                <td colSpan="4" className="courses-empty">
                  No courses found.
                </td>
              </tr>
            ) : (
              filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td>
                    <span className="course-id">#{course.id}</span>
                  </td>

                  <td>
                    <div className="course-name-wrapper">
                      <div className="course-icon">▤</div>

                      <span className="course-name">{course.name}</span>
                    </div>
                  </td>

                  <td>
                    <span className="course-duration">
                      {course.duration || "-"}
                    </span>
                  </td>

                  <td>
                    <div className="courses-actions">
                      <button
                        className="courses-edit-button"
                        onClick={() => openEditModal(course)}
                      >
                        Edit
                      </button>

                      <button
                        className="courses-delete-button"
                        onClick={() => handleDelete(course.id)}
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

export default Courses;
