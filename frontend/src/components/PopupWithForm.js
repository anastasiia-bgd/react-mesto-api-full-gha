import React from 'react';

function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button 
                className="popup__close-button pointer" 
                type="button" 
                onClick={onClose} />
                <form 
                className="popup__form" 
                name={name}
                onSubmit={onSubmit}>
                <h2 className="popup__heading">{title}</h2>
                {children}
                    <button className="form__save-button pointer" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;
