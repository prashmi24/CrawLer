import React, { useEffect, useState } from "react";

const Resume = ({ imageUrl, onClose }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="resume-modal" aria-modal="true" role="dialog">
      <div className="modal-content">
        <span
          className="close"
          onClick={onClose}
          role="button"
          aria-label="Close Modal"
        >
          &times;
        </span>
        <img
          src={imageUrl}
          alt="resume"
          onLoad={() => setIsImageLoaded(true)}
          style={isImageLoaded ? {} : { display: "none" }}
        />
      </div>
    </div>
  );
};

export default Resume;
