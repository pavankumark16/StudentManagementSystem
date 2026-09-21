function AddStudentModal({
  student,
  setStudent,
  departments,
  courses,
  onClose,
  onAdd
}) {

  return (
    <div className="modal-overlay">

      <div className="edit-modal">

        {/* Header */}
        <div className="edit-modal-header">

          <div>
            <h2>Add Student</h2>
            <p>Enter student information</p>
          </div>

          <button
            className="modal-close-button"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* Body */}
        <div className="edit-modal-body">

          {/* First Name */}
          <div className="form-group">
            <label>First Name</label>

            <input
              type="text"
              value={student.firstName}
              onChange={(e) =>
                setStudent({
                  ...student,
                  firstName: e.target.value
                })
              }
              placeholder="Enter first name"
            />
          </div>


          {/* Middle Name */}
          <div className="form-group">
            <label>Middle Name</label>

            <input
              type="text"
              value={student.middleName}
              onChange={(e) =>
                setStudent({
                  ...student,
                  middleName: e.target.value
                })
              }
              placeholder="Enter middle name"
            />
          </div>


          {/* Last Name */}
          <div className="form-group">
            <label>Last Name</label>

            <input
              type="text"
              value={student.lastName}
              onChange={(e) =>
                setStudent({
                  ...student,
                  lastName: e.target.value
                })
              }
              placeholder="Enter last name"
            />
          </div>


          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={student.stdEmail}
              onChange={(e) =>
                setStudent({
                  ...student,
                  stdEmail: e.target.value
                })
              }
              placeholder="Enter email"
            />
          </div>


          {/* Phone */}
          <div className="form-group">
            <label>Phone</label>

            <input
              type="text"
              value={student.phone}
              onChange={(e) =>
                setStudent({
                  ...student,
                  phone: e.target.value
                })
              }
              placeholder="Enter 10 digit phone number"
            />
          </div>


          {/* Age */}
          <div className="form-group">
            <label>Age</label>

            <input
              type="number"
              value={student.age}
              onChange={(e) =>
                setStudent({
                  ...student,
                  age: Number(e.target.value)
                })
              }
              placeholder="Enter age"
            />
          </div>


          {/* Gender */}
          <div className="form-group">
            <label>Gender</label>

            <select
              value={student.gender}
              onChange={(e) =>
                setStudent({
                  ...student,
                  gender: e.target.value
                })
              }
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>


          {/* Department */}
          <div className="form-group">
            <label>Department</label>

            <select
              value={student.department?.id || ""}
              onChange={(e) =>
                setStudent({
                  ...student,
                  department: departments.find(
                    (department) =>
                      department.id === Number(e.target.value)
                  )
                })
              }
            >
              <option value="">Select Department</option>

              {departments.map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                >
                  {department.name}
                </option>
              ))}

            </select>
          </div>


          {/* Course */}
          <div className="form-group">
            <label>Course</label>

            <select
              value={student.course?.id || ""}
              onChange={(e) =>
                setStudent({
                  ...student,
                  course: courses.find(
                    (course) =>
                      course.id === Number(e.target.value)
                  )
                })
              }
            >
              <option value="">Select Course</option>

              {courses.map((course) => (
                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.name}
                </option>
              ))}

            </select>
          </div>


          {/* Address */}
          <div className="form-group">
            <label>Address</label>

            <textarea
              value={student.address}
              onChange={(e) =>
                setStudent({
                  ...student,
                  address: e.target.value
                })
              }
              placeholder="Enter address"
            />
          </div>


          {/* Joining Date */}
          <div className="form-group">
            <label>Joining Date</label>

            <input
              type="date"
              value={student.joiningDate}
              onChange={(e) =>
                setStudent({
                  ...student,
                  joiningDate: e.target.value
                })
              }
            />
          </div>


          {/* Leaving Date */}
          <div className="form-group">
            <label>Leaving Date</label>

            <input
              type="date"
              value={student.leavingDate || ""}
              onChange={(e) =>
                setStudent({
                  ...student,
                  leavingDate: e.target.value || null
                })
              }
            />
          </div>

        </div>


        {/* Footer */}
        <div className="edit-modal-footer">

          <button
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="update-button"
            onClick={onAdd}
          >
            Add Student
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddStudentModal;