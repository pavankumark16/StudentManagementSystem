function AddFacultyModal({
  faculty,
  setFaculty,
  onClose,
  onAdd
}) {

  return (
    <div className="modal-overlay">

      <div className="edit-modal">

        {/* Header */}
        <div className="edit-modal-header">

          <div>
            <h2>Add Faculty</h2>
            <p>Enter faculty information</p>
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

          <div className="form-group">
            <label>First Name</label>

            <input
              type="text"
              value={faculty.firstName}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  firstName: e.target.value
                })
              }
              placeholder="Enter first name"
            />
          </div>


          <div className="form-group">
            <label>Middle Name</label>

            <input
              type="text"
              value={faculty.middleName}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  middleName: e.target.value
                })
              }
              placeholder="Enter middle name"
            />
          </div>


          <div className="form-group">
            <label>Last Name</label>

            <input
              type="text"
              value={faculty.lastName}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  lastName: e.target.value
                })
              }
              placeholder="Enter last name"
            />
          </div>


          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={faculty.email}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  email: e.target.value
                })
              }
              placeholder="Enter email"
            />
          </div>


          <div className="form-group">
            <label>Phone</label>

            <input
              type="text"
              value={faculty.phone}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  phone: e.target.value
                })
              }
              placeholder="Enter 10 digit phone number"
            />
          </div>


          <div className="form-group">
            <label>Gender</label>

            <select
              value={faculty.gender}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
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


          <div className="form-group">
            <label>Qualification</label>

            <input
              type="text"
              value={faculty.qualification}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  qualification: e.target.value
                })
              }
              placeholder="Enter qualification"
            />
          </div>


          <div className="form-group">
            <label>Address</label>

            <textarea
              value={faculty.address}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  address: e.target.value
                })
              }
              placeholder="Enter address"
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
            Add Faculty
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddFacultyModal;