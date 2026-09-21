import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiRequest } from "../services/api";
import AddFacultyModal from "../components/AddFacultyModal";
import EditFacultyModal from "../components/EditFacultyModal";
import Notification from "../components/Notification";
import "./Faculty.css";
import "../components/Modal.css";

function Faculty({ theme, toggleTheme }) {
  const location = useLocation();
  const [faculty, setFaculty] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showAddFaculty, setShowAddFaculty] = useState(false);

  const [editingFaculty, setEditingFaculty] = useState(null);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => {
      setNotification(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [notification]);

  const [newFaculty, setNewFaculty] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    qualification: "",
    address: "",
  });

  const addFaculty = async () => {
    if (!newFaculty.firstName.trim()) {
      setNotification({
        type: "warning",
        message: "First name is required",
      });
      return;
    }

    if (!newFaculty.lastName.trim()) {
      setNotification({
        type: "warning",
        message: "Last name is required",
      });
      return;
    }

    if (!newFaculty.email.trim()) {
      setNotification({
        type: "warning",
        message: "Email is required",
      });
      return;
    }

    if (!newFaculty.phone.trim()) {
      setNotification({
        type: "warning",
        message: "Phone number is required",
      });
      return;
    }

    if (!/^[0-9]{10}$/.test(newFaculty.phone)) {
      setNotification({
        type: "warning",
        message: "Phone number must contain exactly 10 digits",
      });
      return;
    }

    if (!newFaculty.gender) {
      setNotification({
        type: "warning",
        message: "Gender is required",
      });
      return;
    }

    if (!newFaculty.qualification.trim()) {
      setNotification({
        type: "warning",
        message: "Qualification is required",
      });
      return;
    }

    if (!newFaculty.address.trim()) {
      setNotification({
        type: "warning",
        message: "Address is required",
      });
      return;
    }

    try {
      const addedFaculty = await apiRequest("/faculties", {
        method: "POST",
        body: JSON.stringify(newFaculty),
      });

      setFaculty((currentFaculty) => [...currentFaculty, addedFaculty]);

      setNotification({
        type: "success",
        message: "Faculty added successfully",
      });

      setShowAddFaculty(false);

      setNewFaculty({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        qualification: "",
        address: "",
      });
    } catch (error) {
      console.error("Failed to add faculty:", error);

      setNotification({
        type: "error",
        message: "Failed to add faculty",
      });
    }
  };

  useEffect(() => {
    const loadFaculty = async () => {
      try {
        const data = await apiRequest("/faculties");

        setFaculty(data);
      } catch (error) {
        console.error("Failed to load faculty:", error);
      }
    };

    loadFaculty();
  }, []);

  useEffect(() => {
    if (location.state?.openAddFaculty) {
      setShowAddFaculty(true);

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location]);

  const filteredFaculty = faculty.filter((member) =>
    `${member.firstName} ${member.middleName || ""} ${member.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const updateFaculty = async () => {
    if (!editingFaculty.firstName.trim()) {
      setNotification({
        type: "warning",
        message: "First name is required",
      });
      return;
    }

    if (!editingFaculty.lastName.trim()) {
      setNotification({
        type: "warning",
        message: "Last name is required",
      });
      return;
    }

    if (!editingFaculty.email.trim()) {
      setNotification({
        type: "warning",
        message: "Email is required",
      });
      return;
    }

    if (!editingFaculty.phone || !editingFaculty.phone.trim()) {
      setNotification({
        type: "warning",
        message: "Phone number is required",
      });
      return;
    }

    if (!/^[0-9]{10}$/.test(editingFaculty.phone)) {
      setNotification({
        type: "warning",
        message: "Phone number must contain exactly 10 digits",
      });
      return;
    }

    if (!editingFaculty.qualification || !editingFaculty.qualification.trim()) {
      setNotification({
        type: "warning",
        message: "Qualification is required",
      });
      return;
    }

    if (!editingFaculty.gender) {
      setNotification({
        type: "warning",
        message: "Gender is required",
      });
      return;
    }

    if (!editingFaculty.address.trim()) {
      setNotification({
        type: "warning",
        message: "Address is required",
      });
      return;
    }

    try {
      const updatedFaculty = await apiRequest(
        `/faculties/${editingFaculty.id}`,
        {
          method: "PUT",
          body: JSON.stringify(editingFaculty),
        },
      );

      setFaculty((currentFaculty) =>
        currentFaculty.map((member) =>
          member.id === updatedFaculty.id ? updatedFaculty : member,
        ),
      );

      setNotification({
        type: "success",
        message: "Faculty updated successfully",
      });

      setEditingFaculty(null);
    } catch (error) {
      console.error("Failed to update faculty:", error);

      setNotification({
        type: "error",
        message: "Failed to update faculty",
      });
    }
  };

  const deleteFaculty = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this faculty?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiRequest(`/faculties/${id}`, {
        method: "DELETE",
      });

      setFaculty((currentFaculty) =>
        currentFaculty.filter((member) => member.id !== id),
      );

      setNotification({
        type: "success",
        message: "Faculty deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete faculty:", error);

      setNotification({
        type: "error",
        message: "Failed to delete faculty",
      });
    }
  };

  return (
    <>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="faculty-page">
        {showAddFaculty && (
          <AddFacultyModal
            faculty={newFaculty}
            setFaculty={setNewFaculty}
            onClose={() => setShowAddFaculty(false)}
            onAdd={addFaculty}
          />
        )}

        {editingFaculty && (
          <EditFacultyModal
            faculty={editingFaculty}
            setFaculty={setEditingFaculty}
            onClose={() => setEditingFaculty(null)}
            onUpdate={updateFaculty}
          />
        )}

      <div className="faculty-page-header">
  <div>
    <h1>Faculty</h1>
    <p>Manage faculty members</p>
  </div>

  <div className="faculty-header-actions">

    <button
      className="add-faculty-button"
      onClick={() => setShowAddFaculty(true)}
    >
      <span>＋</span>
      Add Faculty
    </button>

    <button
      className="faculty-theme-button"
      onClick={toggleTheme}
    >
      <span className="faculty-theme-icon">
        {theme === "light" ? "☾" : "☀"}
      </span>

      <span>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </span>
    </button>

  </div>
</div>

        <div className="faculty-toolbar">
          <div className="faculty-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="faculty-table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Qualification</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredFaculty.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>

                  <td>
                    {member.firstName} {member.middleName || ""}{" "}
                    {member.lastName}
                  </td>

                  <td>{member.email}</td>

                  <td>{member.phone}</td>

                  <td>{member.gender}</td>

                  <td>{member.qualification}</td>

                  <td>{member.address}</td>

                  <td className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={() => setEditingFaculty(member)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => deleteFaculty(member.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Faculty;
