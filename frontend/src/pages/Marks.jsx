import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import Notification from "../components/Notification";
import "./Marks.css";

function Marks({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleBack = () => {
    if (role === "ROLE_ADMIN") {
      navigate("/admin");
    } else if (role === "ROLE_FACULTY") {
      navigate("/faculty");
    }
  };

  const [marks, setMarks] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [notification, setNotification] = useState(null);

  const [showMarkModal, setShowMarkModal] = useState(false);

  const [editingMark, setEditingMark] = useState(null);

  const [markForm, setMarkForm] = useState({
    examType: "MIDTERM",
    marks: "",
    studentId: "",
    subjectId: "",
  });

  /* =========================================
     NOTIFICATION AUTO DISMISS
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
     LOAD DATA
     ========================================= */

  useEffect(() => {
    loadMarks();
    loadStudents();
    loadSubjects();
  }, []);

  /* =========================================
     LOAD MARKS
     ========================================= */

  const loadMarks = async () => {
    try {
      const data = await apiRequest("/marks");

      setMarks(data);
    } catch (error) {
      console.error(error);

      setNotification({
        type: "error",
        message: "Failed to load marks",
      });
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
      console.error(error);

      setNotification({
        type: "error",
        message: "Failed to load students",
      });
    }
  };

  /* =========================================
     LOAD SUBJECTS
     ========================================= */

  const loadSubjects = async () => {
    try {
      const data = await apiRequest("/subjects");

      setSubjects(data);
    } catch (error) {
      console.error(error);

      setNotification({
        type: "error",
        message: "Failed to load subjects",
      });
    }
  };

  /* =========================================
     OPEN ADD MARK MODAL
     ========================================= */

  const openAddModal = () => {
    setEditingMark(null);

    setMarkForm({
      examType: "MIDTERM",
      marks: "",
      studentId: "",
      subjectId: "",
    });

    setShowMarkModal(true);
  };

  /* =========================================
     OPEN EDIT MARK MODAL
     ========================================= */

  const openEditModal = (mark) => {
    setEditingMark(mark);

    setMarkForm({
      examType: mark.examType || "MIDTERM",
      marks: mark.marks ?? "",
      studentId: mark.student?.stdRollNo || "",
      subjectId: mark.subject?.id || "",
    });

    setShowMarkModal(true);
  };

  /* =========================================
     CLOSE MODAL
     ========================================= */

  const closeModal = () => {
    setShowMarkModal(false);

    setEditingMark(null);
  };

  /* =========================================
     HANDLE INPUT
     ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMarkForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================
     SAVE / UPDATE MARKS
     ========================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* ---------- VALIDATION ---------- */

    if (!markForm.studentId) {
      setNotification({
        type: "error",
        message: "Please select a student",
      });

      return;
    }

    if (!markForm.subjectId) {
      setNotification({
        type: "error",
        message: "Please select a subject",
      });

      return;
    }

    if (markForm.marks === "") {
      setNotification({
        type: "error",
        message: "Please enter marks",
      });

      return;
    }

    const marksValue = Number(markForm.marks);

    if (marksValue < 0 || marksValue > 100) {
      setNotification({
        type: "error",
        message: "Marks must be between 0 and 100",
      });

      return;
    }

    /* ---------- PAYLOAD ---------- */

    const payload = {
      examType: markForm.examType,

      marks: marksValue,

      student: {
        stdRollNo: Number(markForm.studentId),
      },

      subject: {
        id: Number(markForm.subjectId),
      },
    };

    try {
      /* ---------- UPDATE ---------- */

      if (editingMark) {
        await apiRequest(`/marks/${editingMark.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        setNotification({
          type: "success",
          message: "Marks updated successfully",
        });
      } else {
        /* ---------- ADD ---------- */
        await apiRequest("/marks", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        setNotification({
          type: "success",
          message: "Marks added successfully",
        });
      }

      closeModal();

      loadMarks();
    } catch (error) {
      console.error(error);

      setNotification({
        type: "error",
        message: editingMark ? "Failed to update marks" : "Failed to add marks",
      });
    }
  };

  /* =========================================
     DELETE MARKS
     ========================================= */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete these marks?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiRequest(`/marks/${id}`, {
        method: "DELETE",
      });

      setNotification({
        type: "success",
        message: "Marks deleted successfully",
      });

      loadMarks();
    } catch (error) {
      console.error(error);

      setNotification({
        type: "error",
        message: "Failed to delete marks",
      });
    }
  };

  /* =========================================
     SEARCH
     ========================================= */

  const filteredMarks = marks.filter((mark) => {
    const studentName = `
      ${mark.student?.firstName || ""}
      ${mark.student?.middleName || ""}
      ${mark.student?.lastName || ""}
    `.toLowerCase();

    const subjectName = mark.subject?.name?.toLowerCase() || "";

    const examType = mark.examType?.toLowerCase() || "";

    const search = searchTerm.toLowerCase();

    return (
      studentName.includes(search) ||
      subjectName.includes(search) ||
      examType.includes(search) ||
      String(mark.marks).includes(search)
    );
  });

  /* =========================================
     GET STUDENT NAME
     ========================================= */

  const getStudentName = (student) => {
    if (!student) {
      return "-";
    }

    return [student.firstName, student.middleName, student.lastName]
      .filter(Boolean)
      .join(" ");
  };

  /* =========================================
     RENDER
     ========================================= */

  return (
    <div className="marks-page">
      {/* =====================================
          HEADER
          ===================================== */}
      <div className="marks-header">
        <div className="marks-header-title">
          <button className="marks-back-button" onClick={handleBack}>
            ←
          </button>

          <div>
            <h1>Marks Management</h1>

            <p>Manage student academic marks and results</p>
          </div>
        </div>

        <div className="marks-header-actions">
          <button className="marks-theme-button" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button className="marks-add-button" onClick={openAddModal}>
            + Add Marks
          </button>
        </div>
      </div>

      {/* =====================================
          CONTENT CARD
          ===================================== */}

      <div className="marks-content-card">
        {/* SEARCH */}

        <div className="marks-toolbar">
          <div className="marks-search">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search marks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="marks-count">{filteredMarks.length} Records</div>
        </div>

        {/* ===================================
            TABLE
            =================================== */}

        <div className="marks-table-container">
          <table className="marks-table">
            <thead>
              <tr>
                <th>ID</th>

                <th>Student</th>

                <th>Subject</th>

                <th>Exam Type</th>

                <th>Marks</th>

                <th>Faculty</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredMarks.length === 0 ? (
                <tr>
                  <td colSpan="7" className="marks-empty">
                    No marks records found
                  </td>
                </tr>
              ) : (
                filteredMarks.map((mark) => (
                  <tr key={mark.id}>
                    <td>{mark.id}</td>

                    <td>
                      <div className="marks-student">
                        <div className="marks-avatar">
                          {mark.student?.firstName?.charAt(0)?.toUpperCase() ||
                            "S"}
                        </div>

                        <div>
                          <strong>{getStudentName(mark.student)}</strong>

                          <span>Roll No: {mark.student?.stdRollNo}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="marks-subject">
                        <strong>{mark.subject?.name || "-"}</strong>

                        <span>{mark.subject?.code || "-"}</span>
                      </div>
                    </td>

                    <td>
                      <span className="marks-exam-badge">{mark.examType}</span>
                    </td>

                    <td>
                      <span className="marks-value">
                        {mark.marks}

                        <small>/100</small>
                      </span>
                    </td>

                    <td>{getStudentName(mark.faculty)}</td>

                    <td>
                      <div className="marks-actions">
                        <button
                          className="marks-edit-button"
                          onClick={() => openEditModal(mark)}
                        >
                          Edit
                        </button>

                        <button
                          className="marks-delete-button"
                          onClick={() => handleDelete(mark.id)}
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

      {/* =====================================
          ADD / EDIT MODAL
          ===================================== */}

      {showMarkModal && (
        <div className="marks-modal-overlay" onClick={closeModal}>
          <div className="marks-modal" onClick={(e) => e.stopPropagation()}>
            {/* MODAL HEADER */}

            <div className="marks-modal-header">
              <div>
                <h2>{editingMark ? "Edit Marks" : "Add Marks"}</h2>

                <p>
                  {editingMark
                    ? "Update student academic marks"
                    : "Enter student academic marks"}
                </p>
              </div>

              <button className="marks-modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            {/* FORM */}

            <form className="marks-form" onSubmit={handleSubmit}>
              {/* STUDENT */}

              <div className="marks-form-group">
                <label>Student</label>

                <select
                  name="studentId"
                  value={markForm.studentId}
                  onChange={handleChange}
                >
                  <option value="">Select Student</option>

                  {students.map((student) => (
                    <option key={student.stdRollNo} value={student.stdRollNo}>
                      {getStudentName(student)}
                      {" - Roll No: "}
                      {student.stdRollNo}
                    </option>
                  ))}
                </select>
              </div>

              {/* SUBJECT */}

              <div className="marks-form-group">
                <label>Subject</label>

                <select
                  name="subjectId"
                  value={markForm.subjectId}
                  onChange={handleChange}
                >
                  <option value="">Select Subject</option>

                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                      {" ("}
                      {subject.code}
                      {")"}
                    </option>
                  ))}
                </select>
              </div>

              {/* EXAM TYPE */}

              <div className="marks-form-group">
                <label>Exam Type</label>

                <select
                  name="examType"
                  value={markForm.examType}
                  onChange={handleChange}
                >
                  <option value="MIDTERM">Midterm</option>

                  <option value="INTERNAL">Internal</option>

                  <option value="FINAL">Final</option>

                  <option value="ASSIGNMENT">Assignment</option>

                  <option value="QUIZ">Quiz</option>
                </select>
              </div>

              {/* MARKS */}

              <div className="marks-form-group">
                <label>Marks</label>

                <input
                  type="number"
                  name="marks"
                  min="0"
                  max="100"
                  placeholder="Enter marks (0-100)"
                  value={markForm.marks}
                  onChange={handleChange}
                />
              </div>

              {/* FOOTER */}

              <div className="marks-modal-footer">
                <button
                  type="button"
                  className="marks-cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="marks-save-button">
                  {editingMark ? "Update Marks" : "Save Marks"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================
          NOTIFICATION
          ===================================== */}

      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
}

export default Marks;
