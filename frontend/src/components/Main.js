import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container-avatar">
                    <img
                        className="profile__avatar"
                        src={currentUser.avatar}
                        alt="Аватар" />
                    <button
                        className="profile__edit-button-avatar"
                        type="button"
                        onClick={() => {
                            onEditAvatar(true)
                        }}>
                    </button>
                </div>
                <div className="profile__info">
                    <div className="profile__info-container">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            className="profile__edit-button"
                            type="button"
                            onClick={() => { onEditProfile(true) }}
                        ></button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    onClick={() => { onAddPlace(true) }}
                ></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        card={card}
                        key={card._id}
                        onCardDelete={onCardDelete}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main