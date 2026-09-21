import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import Notification from "../components/Notification";
import "./Attendance.css";

function Attendance({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleBack = () => {
    if (role === "ROLE_ADMIN") {
      navigate("/admin");
    } else if (role === "ROLE_FACULTY") {
      navigate("/faculty");
    }
  };

  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  const [showMarkAttendance, setShowMarkAttendance] = useState(false);

  const [newAttendance, setNewAttendance] = useState({
    attendanceDate: "",
    status: "PRESENT",
    studentId: "",
    subjectId: "",
    facultyId: "",
  });

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => {
      setNotification(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [notification]);

  useEffect(() => {
    loadAttendance();
    loadStudents();
    loadSubjects();
  }, []);

  const loadAttendance = async () => {
    try {
      const data = await apiRequest("/attendances");
      setAttendance(data);
    } catch (error) {
      console.error("Failed to load attendance:", error);
    }
  };

  const loadStudents = async () => {
    try {
      const data = await apiRequest("/students");
      setStudents(data);
    } catch (error) {
      console.error("Failed to load students:", error);
    }
  };

  const loadSubjects = async () => {
    try {
      const data = await apiRequest("/subjects");
      setSubjects(data);
    } catch (error) {
      console.error("Failed to load subjects:", error);
    }
  };

  const markAttendance = async () => {
    if (!newAttendance.studentId) {
      setNotification({
        type: "error",
        message: "Please select a student",
      });
      return;
    }

    if (!newAttendance.subjectId) {
      setNotification({
        type: "error",
        message: "Please select a subject",
      });
      return;
    }

    if (!newAttendance.attendanceDate) {
      setNotification({
        type: "error",
        message: "Please select a date",
      });
      return;
    }

    try {
      const payload = {
        attendanceDate: newAttendance.attendanceDate,
        status: newAttendance.status,
        student: {
          stdRollNo: Number(newAttendance.studentId),
        },
        subject: {
          id: Number(newAttendance.subjectId),
        },
      };

      const savedAttendance = await apiRequest("/attendances", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setAttendance((current) => [...current, savedAttendance]);

      setShowMarkAttendance(false);

      setNewAttendance({
        attendanceDate: "",
        status: "PRESENT",
        studentId: "",
        subjectId: "",
        facultyId: "",
      });

      setNotification({
        type: "success",
        message: "Attendance marked successfully",
      });
    } catch (error) {
      console.error("Failed to mark attendance:", error);
      setNotification({
        type: "error",
        message: "Failed to mark attendance",
      });
    }
  };

  const filteredAttendance = attendance.filter((record) => {
    const studentName = record.student
      ? `${record.student.firstName} ${record.student.lastName}`
      : "";

    const subjectName = record.subject?.name || "";

    return `${studentName} ${subjectName} ${record.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div className="attendance-page">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {showMarkAttendance && (
        <div className="attendance-modal-overlay">
          <div className="attendance-modal">
            <div className="attendance-modal-header">
              <div>
                <h2>Mark Attendance</h2>
                <p>Record attendance for a student</p>
              </div>

              <button
                className="attendance-modal-close"
                onClick={() => setShowMarkAttendance(false)}
              >
                ×
              </button>
            </div>

            <div className="attendance-modal-body">
              <div className="attendance-form-group">
                <label>Student</label>

                <select
                  value={newAttendance.studentId}
                  onChange={(e) =>
                    setNewAttendance({
                      ...newAttendance,
                      studentId: e.target.value,
                    })
                  }
                >
                  <option value="">Select Student</option>

                  {students.map((student) => (
                    <option key={student.stdRollNo} value={student.stdRollNo}>
                      {student.firstName} {student.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="attendance-form-group">
                <label>Subject</label>

                <select
                  value={newAttendance.subjectId}
                  onChange={(e) =>
                    setNewAttendance({
                      ...newAttendance,
                      subjectId: e.target.value,
                    })
                  }
                >
                  <option value="">Select Subject</option>

                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="attendance-form-row">
                <div className="attendance-form-group">
                  <label>Date</label>

                  <input
                    type="date"
                    value={newAttendance.attendanceDate}
                    onChange={(e) =>
                      setNewAttendance({
                        ...newAttendance,
                        attendanceDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="attendance-form-group">
                  <label>Status</label>

                  <select
                    value={newAttendance.status}
                    onChange={(e) =>
                      setNewAttendance({
                        ...newAttendance,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="PRESENT">Present</option>
                    <option value="ABSENT">Absent</option>
                    <option value="LATE">Late</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="attendance-modal-footer">
              <button
                className="attendance-cancel-button"
                onClick={() => setShowMarkAttendance(false)}
              >
                Cancel
              </button>

              <button
                className="attendance-save-button"
                onClick={markAttendance}
              >
                Mark Attendance
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="attendance-header">
        <div className="attendance-header-title">
          <button className="attendance-back-button" onClick={handleBack}>
            ←
          </button>

          <div>
            <h1>Attendance</h1>
            <p>View and manage student attendance</p>
          </div>
        </div>

        <div className="attendance-header-actions">
          <button
            className="mark-attendance-button"
            onClick={() => setShowMarkAttendance(true)}
          >
            + Mark Attendance
          </button>

          <button className="attendance-theme-button" onClick={toggleTheme}>
            <span className="attendance-theme-icon">
              {theme === "light" ? "☾" : "☀"}
            </span>

            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>
      </div>

      <div className="attendance-toolbar">
        <div className="attendance-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search attendance..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="attendance-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Faculty</th>
            </tr>
          </thead>

          <tbody>
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>

                  <td>
                    {record.student
                      ? `${record.student.firstName} ${
                          record.student.middleName || ""
                        } ${record.student.lastName}`
                      : "-"}
                  </td>

                  <td>{record.subject?.name || "-"}</td>

                  <td>{record.attendanceDate || "-"}</td>

                  <td>
                    <span
                      className={`attendance-status ${
                        record.status?.toLowerCase() || ""
                      }`}
                    >
                      {record.status || "-"}
                    </span>
                  </td>

                  <td>
                    {record.faculty
                      ? `${record.faculty.firstName} ${record.faculty.lastName}`
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="attendance-empty">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
