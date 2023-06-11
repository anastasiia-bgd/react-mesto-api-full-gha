import React from 'react';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardLike, onCardDelete, onCardClick }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwner = card.owner === currentUser._id;
    const isLiked = card.likes.some(id => id === currentUser._id);

    const cardLikeButtonClassName =
        `card__like-button ${isLiked && 'card__like-button_active'}`;

    function handleCardClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <article className="card">
            {isOwner && (
                <button
                    className="card__trash"
                    type="button"
                    onClick={handleDeleteClick} />)}
            <img
                className="card__image"
                alt={card.name}
                src={card.link}
                onClick={handleCardClick} />
            <div className="card__caption">
                <h2 className="card__title">{card.name}</h2>
                <div className="cards__item-likes">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick} />
                    <p className="card__likes-counter">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;
