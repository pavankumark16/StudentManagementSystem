import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import Notification from "../components/Notification";
import "./Subjects.css";

function Subjects({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [credits, setCredits] = useState("");
  const [courseId, setCourseId] = useState("");
  const [facultyId, setFacultyId] = useState("");

  useEffect(() => {
    loadSubjects();
    loadCourses();
    loadFaculties();
  }, []);

  useEffect(() => {
    if (location.state?.openAddSubject) {
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

  const loadSubjects = async () => {
    try {
      const data = await apiRequest("/subjects");
      setSubjects(data);
    } catch (error) {
      console.error("Failed to load subjects:", error);

      setNotification({
        type: "error",
        message: "Failed to load subjects",
      });
    }
  };

  const loadCourses = async () => {
    try {
      const data = await apiRequest("/courses");
      setCourses(data);
    } catch (error) {
      console.error("Failed to load courses:", error);
    }
  };

  const loadFaculties = async () => {
    try {
      const data = await apiRequest("/faculties");
      setFaculties(data);
    } catch (error) {
      console.error("Failed to load faculties:", error);
    }
  };

  const openAddModal = () => {
    setEditingSubject(null);

    setSubjectName("");
    setSubjectCode("");
    setCredits("");
    setCourseId("");
    setFacultyId("");

    setShowModal(true);
  };

  const openEditModal = (subject) => {
    setEditingSubject(subject);

    setSubjectName(subject.name || "");
    setSubjectCode(subject.code || "");
    setCredits(subject.credits ?? "");
    setCourseId(subject.course?.id || "");
    setFacultyId(subject.faculty?.id || "");

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSubject(null);

    setSubjectName("");
    setSubjectCode("");
    setCredits("");
    setCourseId("");
    setFacultyId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = subjectName.trim();
    const trimmedCode = subjectCode.trim();

    if (!trimmedName) {
      setNotification({
        type: "error",
        message: "Please enter subject name",
      });
      return;
    }

    if (!trimmedCode) {
      setNotification({
        type: "error",
        message: "Please enter subject code",
      });
      return;
    }

    if (!credits || Number(credits) <= 0) {
      setNotification({
        type: "error",
        message: "Please enter valid credits",
      });
      return;
    }

    if (!courseId) {
      setNotification({
        type: "error",
        message: "Please select a course",
      });
      return;
    }

    if (!facultyId) {
      setNotification({
        type: "error",
        message: "Please select a faculty",
      });
      return;
    }

    try {
      const payload = {
        name: trimmedName,
        code: trimmedCode,
        credits: Number(credits),

        course: {
          id: Number(courseId),
        },

        faculty: {
          id: Number(facultyId),
        },
      };

      if (editingSubject) {
        await apiRequest(`/subjects/${editingSubject.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        setNotification({
          type: "success",
          message: "Subject updated successfully",
        });
      } else {
        await apiRequest("/subjects", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        setNotification({
          type: "success",
          message: "Subject added successfully",
        });
      }

      closeModal();
      loadSubjects();
    } catch (error) {
      console.error("Failed to save subject:", error);

      setNotification({
        type: "error",
        message: editingSubject
          ? "Failed to update subject"
          : "Failed to add subject",
      });
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this subject?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiRequest(`/subjects/${id}`, {
        method: "DELETE",
      });

      setNotification({
        type: "success",
        message: "Subject deleted successfully",
      });

      loadSubjects();
    } catch (error) {
      console.error("Failed to delete subject:", error);

      setNotification({
        type: "error",
        message: "Failed to delete subject",
      });
    }
  };

  const filteredSubjects = subjects.filter((subject) => {
    const name = subject.name?.toLowerCase() || "";
    const code = subject.code?.toLowerCase() || "";
    const course = subject.course?.name?.toLowerCase() || "";
    const faculty = subject.faculty
      ? `${subject.faculty.firstName || ""} ${
          subject.faculty.lastName || ""
        }`.toLowerCase()
      : "";

    const id = String(subject.id || "");

    const search = searchTerm.toLowerCase();

    return (
      name.includes(search) ||
      code.includes(search) ||
      course.includes(search) ||
      faculty.includes(search) ||
      id.includes(search)
    );
  });

  return (
    <div className="subjects-page">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {showModal && (
        <div className="subjects-modal-overlay" onClick={closeModal}>
          <div className="subjects-modal" onClick={(e) => e.stopPropagation()}>
            <div className="subjects-modal-header">
              <div>
                <h2>{editingSubject ? "Edit Subject" : "Add Subject"}</h2>

                <p>
                  {editingSubject
                    ? "Update subject information"
                    : "Create a new academic subject"}
                </p>
              </div>

              <button className="subjects-modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <form className="subjects-form" onSubmit={handleSubmit}>
              <div className="subjects-form-group">
                <label>Subject Name</label>

                <input
                  type="text"
                  placeholder="Enter subject name"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="subjects-form-row">
                <div className="subjects-form-group">
                  <label>Subject Code</label>

                  <input
                    type="text"
                    placeholder="Example: JAVA101"
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                  />
                </div>

                <div className="subjects-form-group">
                  <label>Credits</label>

                  <input
                    type="number"
                    min="1"
                    placeholder="Example: 4"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                  />
                </div>
              </div>

              <div className="subjects-form-group">
                <label>Course</label>

                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                >
                  <option value="">Select Course</option>

                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="subjects-form-group">
                <label>Faculty</label>

                <select
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                >
                  <option value="">Select Faculty</option>

                  {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.firstName} {faculty.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="subjects-modal-footer">
                <button
                  type="button"
                  className="subjects-cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="subjects-save-button">
                  {editingSubject ? "Update Subject" : "Add Subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="subjects-header">
        <div className="subjects-header-title">
          <button
            className="subjects-back-button"
            onClick={() => navigate("/admin")}
          >
            ←
          </button>

          <div>
            <h1>Subjects</h1>
            <p>Manage academic subjects</p>
          </div>
        </div>

        <div className="subjects-header-actions">
          <button className="subjects-theme-button" onClick={toggleTheme}>
            <span className="subjects-theme-icon">
              {theme === "light" ? "☾" : "☀"}
            </span>

            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>
      </div>

      <div className="subjects-toolbar">
        <div className="subjects-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="subjects-toolbar-right">
          <div className="subjects-count">
            {filteredSubjects.length}{" "}
            {filteredSubjects.length === 1 ? "Subject" : "Subjects"}
          </div>

          <button className="subjects-add-button" onClick={openAddModal}>
            + Add Subject
          </button>
        </div>
      </div>

      <div className="subjects-table-container">
        <table className="subjects-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Code</th>
              <th>Credits</th>
              <th>Course</th>
              <th>Faculty</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSubjects.length === 0 ? (
              <tr>
                <td colSpan="7" className="subjects-empty">
                  No subjects found.
                </td>
              </tr>
            ) : (
              filteredSubjects.map((subject) => (
                <tr key={subject.id}>
                  <td>
                    <span className="subject-id">#{subject.id}</span>
                  </td>

                  <td>
                    <div className="subject-name-wrapper">
                      <div className="subject-icon">▥</div>

                      <span className="subject-name">{subject.name}</span>
                    </div>
                  </td>

                  <td>
                    <span className="subject-code">{subject.code}</span>
                  </td>

                  <td>
                    <span className="subject-credits">{subject.credits}</span>
                  </td>

                  <td>{subject.course?.name || "-"}</td>

                  <td>
                    {subject.faculty
                      ? `${subject.faculty.firstName || ""} ${
                          subject.faculty.lastName || ""
                        }`
                      : "-"}
                  </td>

                  <td>
                    <div className="subjects-actions">
                      <button
                        className="subjects-edit-button"
                        onClick={() => openEditModal(subject)}
                      >
                        Edit
                      </button>

                      <button
                        className="subjects-delete-button"
                        onClick={() => handleDelete(subject.id)}
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

export default Subjects;
