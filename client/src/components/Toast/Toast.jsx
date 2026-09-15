import "./Toast.css";

import {
  FiCheckCircle,
  FiHeart,
  FiShoppingCart,
  FiTrash2,
  FiX,
} from "react-icons/fi";

function Toast({
  message,
  description,
  type = "success",
  show,
  onClose,
}) {
  const getIcon = () => {
    if (type === "cart") {
      return <FiShoppingCart />;
    }

    if (type === "wishlist") {
      return <FiHeart />;
    }

    if (type === "remove") {
      return <FiTrash2 />;
    }

    return <FiCheckCircle />;
  };

  return (
    <div
      className={`toast-notification ${
        show ? "toast-show" : ""
      } ${type}`}
    >
      <div className="toast-icon">
        {getIcon()}
      </div>

      <div className="toast-content">
        <h4>{message}</h4>

        {description && (
          <p>{description}</p>
        )}
      </div>

      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        <FiX />
      </button>

      <div className="toast-progress"></div>
    </div>
  );
}

export default Toast;