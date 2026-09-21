import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiRequest } from "../services/api";
import Notification from "../components/Notification";
import AddStudentModal from "../components/AddStudentModal";
import "./Students.css";
import "../components/Modal.css";

function Students({ theme, toggleTheme }) {
  const location = useLocation();

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  const [showAddStudent, setShowAddStudent] = useState(false);

  const [newStudent, setNewStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    stdEmail: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    joiningDate: "",
    leavingDate: null,
    department: null,
    course: null,
  });

  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (location.state?.openAddStudent) {
      setShowAddStudent(true);

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location]);

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
    const loadStudents = async () => {
      try {
        const data = await apiRequest("/students");

        setStudents(data);

        const departmentData = await apiRequest("/departments");
        setDepartments(departmentData);

        const courseData = await apiRequest("/courses");
        setCourses(courseData);
      } catch (error) {
        console.error("Failed to load students:", error);
      }
    };

    loadStudents();
  }, []);

  const addStudent = async () => {
    // Validation
    if (!newStudent.firstName.trim()) {
      setNotification({
        type: "error",
        message: "First name is required",
      });
      return;
    }

    if (!newStudent.lastName.trim()) {
      setNotification({
        type: "error",
        message: "Last name is required",
      });
      return;
    }

    if (!newStudent.stdEmail.trim()) {
      setNotification({
        type: "error",
        message: "Email is required",
      });
      return;
    }

    if (!newStudent.age) {
      setNotification({
        type: "error",
        message: "Age is required",
      });
      return;
    }

    if (!newStudent.gender) {
      setNotification({
        type: "error",
        message: "Gender is required",
      });
      return;
    }

    if (!newStudent.address.trim()) {
      setNotification({
        type: "error",
        message: "Address is required",
      });
      return;
    }

    try {
      const addedStudent = await apiRequest("/students", {
        method: "POST",
        body: JSON.stringify(newStudent),
      });

      setStudents((currentStudents) => [...currentStudents, addedStudent]);

      setShowAddStudent(false);

      setNewStudent({
        firstName: "",
        middleName: "",
        lastName: "",
        stdEmail: "",
        phone: "",
        age: "",
        gender: "",
        address: "",
        joiningDate: "",
        leavingDate: null,
        department: null,
        course: null,
      });

      setNotification({
        type: "success",
        message: "Student added successfully",
      });
    } catch (error) {
      console.error("Failed to add student:", error);

      setNotification({
        type: "error",
        message: "Failed to add student",
      });
    }
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await apiRequest(`/students/${id}`, {
        method: "DELETE",
      });

      setStudents(students.filter((student) => student.stdRollNo !== id));

      setNotification({
        type: "success",
        message: "Student deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete student:", error);

      alert("Failed to delete student");
    }
  };

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.middleName || ""} ${student.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="students-page">
      {showAddStudent && (
        <AddStudentModal
          student={newStudent}
          setStudent={setNewStudent}
          departments={departments}
          courses={courses}
          onClose={() => setShowAddStudent(false)}
          onAdd={addStudent}
        />
      )}

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {editingStudent && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="edit-modal-header">
              <div>
                <h2>Edit Student</h2>
                <p>Update student information</p>
              </div>

              <button
                className="modal-close-button"
                onClick={() => setEditingStudent(null)}
              >
                ×
              </button>
            </div>

            <div className="edit-modal-body">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={editingStudent.firstName}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Middle Name</label>
                <input
                  type="text"
                  value={editingStudent.middleName || ""}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      middleName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={editingStudent.lastName}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editingStudent.stdEmail}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      stdEmail: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  value={editingStudent.phone}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={editingStudent.age}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      age: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select
                  value={editingStudent.gender}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      gender: e.target.value,
                    })
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Department</label>

                <select
                  value={editingStudent.department?.id || ""}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      department: departments.find(
                        (department) =>
                          department.id === Number(e.target.value),
                      ),
                    })
                  }
                >
                  <option value="">Select Department</option>

                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Course</label>

                <select
                  value={editingStudent.course?.id || ""}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      course: courses.find(
                        (course) => course.id === Number(e.target.value),
                      ),
                    })
                  }
                >
                  <option value="">Select Course</option>

                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  value={editingStudent.address}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      address: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Joining Date</label>
                <input
                  type="date"
                  value={editingStudent.joiningDate || ""}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      joiningDate: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Leaving Date</label>
                <input
                  type="date"
                  value={editingStudent.leavingDate || ""}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      leavingDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="edit-modal-footer">
              <button
                className="cancel-button"
                onClick={() => setEditingStudent(null)}
              >
                Cancel
              </button>

              <button
                className="update-button"
                onClick={async () => {
                  if (!editingStudent.firstName.trim()) {
                    alert("First name is required");
                    return;
                  }

                  if (!editingStudent.lastName.trim()) {
                    alert("Last name is required");
                    return;
                  }

                  try {
                    const updatedStudent = await apiRequest(
                      `/students/${editingStudent.stdRollNo}`,
                      {
                        method: "PUT",
                        body: JSON.stringify(editingStudent),
                      },
                    );

                    setStudents(
                      students.map((student) =>
                        student.stdRollNo === editingStudent.stdRollNo
                          ? updatedStudent
                          : student,
                      ),
                    );

                    setEditingStudent(null);

                    setNotification({
                      type: "success",
                      message: "Student updated successfully",
                    });
                  } catch (error) {
                    console.error("Failed to update student:", error);

                    alert("Failed to update student");
                  }
                }}
              >
                Update Student
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="students-header">
        <div>
          <h1>Students</h1>
          <p>Manage all student records</p>
        </div>

        <div className="students-header-actions">
          <button
            className="add-student-button"
            onClick={() => setShowAddStudent(true)}
          >
            + Add Student
          </button>

          <button className="students-theme-button" onClick={toggleTheme}>
            <span className="students-theme-icon">
              {theme === "light" ? "☾" : "☀"}
            </span>

            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>
      </div>

      <div className="students-toolbar">
        <input
          type="text"
          className="student-search"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="students-table-card">
        {students.length === 0 ? (
          <div className="no-students">No students found.</div>
        ) : (
          <table className="students-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.stdRollNo}>
                  <td>{student.stdRollNo}</td>

                  <td className="student-name">
                    {student.firstName} {student.middleName || ""}{" "}
                    {student.lastName}
                  </td>

                  <td>{student.stdEmail}</td>

                  <td>{student.phone}</td>

                  <td>{student.gender}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => setEditingStudent(student)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => deleteStudent(student.stdRollNo)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Students;
