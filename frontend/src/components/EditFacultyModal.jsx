function EditFacultyModal({ faculty, setFaculty, onClose, onUpdate }) {
  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <div className="edit-modal-header">
          <div>
            <h2>Edit Faculty</h2>
            <p>Update faculty information</p>
          </div>

          <button className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="edit-modal-body">
          {/* First Name */}
          <div className="form-group">
            <label>First Name</label>

            <input
              type="text"
              value={faculty.firstName}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  firstName: e.target.value,
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
              value={faculty.middleName || ""}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  middleName: e.target.value,
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
              value={faculty.lastName}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  lastName: e.target.value,
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
              value={faculty.email}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  email: e.target.value,
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
              value={faculty.phone || ""}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  phone: e.target.value,
                })
              }
              placeholder="Enter 10 digit phone number"
            />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender</label>

            <select
              value={faculty.gender}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
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

          {/* Qualification */}
          <div className="form-group">
            <label>Qualification</label>

            <input
              type="text"
              value={faculty.qualification || ""}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  qualification: e.target.value,
                })
              }
              placeholder="Enter qualification"
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address</label>

            <textarea
              value={faculty.address}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  address: e.target.value,
                })
              }
              placeholder="Enter address"
            />
          </div>
        </div>

        <div className="edit-modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>

          <button className="update-button" onClick={onUpdate}>
            Update Faculty
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditFacultyModal;
