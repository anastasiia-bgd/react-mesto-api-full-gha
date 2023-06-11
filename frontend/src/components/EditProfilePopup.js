import React, { useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ onClose, onUpdateUser, onLoading, isOpen }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [about, setAbout] = useState('');
  const [name, setName] = useState('');
  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText={onLoading ? `Сохранение` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="form popup__form">
        <input
          className="form__input form__input_info_name"
          type="text"
          name="name"
          id="username"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleChangeName}
          required />
        <span className="username-error form__input-error"></span>
      </label>
      <label className="form popup__form">
        <input
          className="form__input form__input_info_info"
          type="text"
          name="info"
          id="user-info"
          placeholder="Деятельность"
          minLength="2"
          maxLength="200"
          value={about || ""}
          onChange={handleChangeAbout}
          required />
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;