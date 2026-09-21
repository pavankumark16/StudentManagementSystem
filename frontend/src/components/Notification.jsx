function Notification({ type, message, onClose }) {
  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-icon">
        {type === "success" && "✓"}
        {type === "error" && "!"}
        {type === "warning" && "⚠"}
        {type === "info" && "i"}
      </div>

      <div className="notification-message">{message}</div>

      <button className="notification-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default Notification;
