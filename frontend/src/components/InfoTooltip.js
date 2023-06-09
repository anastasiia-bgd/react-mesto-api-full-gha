
import React from "react";

function InfoTooltip({ isOpen, onClose, text, image, name }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <img className="popup__auth-image" src={image} alt="" />
        <h2 className="popup__auth-title">{text}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
