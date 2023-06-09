import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_image ${card.link ? "popup_opened" : ""}`}>
            <figure className="popup__image-container">
                <img className="popup__image" src={card.link} alt={card.name} />
                <figcaption className="popup__caption">{card.name}</figcaption>
                <button className="popup__close-button pointer" type="button" onClick={onClose} />
            </figure>
        </div>
    )
}

export default ImagePopup;
