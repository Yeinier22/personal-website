import React from "react";
import { useAlertContext } from "../context/alertContext";

const Alert = () => {
  const { isOpen, type, message } = useAlertContext();

  if (!isOpen) {
    return null;
  }

  const isSuccess = type === "success";

  return (
    <div
      className={`global-alert global-alert--${
        isSuccess ? "success" : "error"
      }`}
      role={isSuccess ? "status" : "alert"}
    >
      <strong>{isSuccess ? "Message sent" : "Unable to send"}</strong>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
