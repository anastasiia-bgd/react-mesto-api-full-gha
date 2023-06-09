import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onClose, onAddPlace, onLoading, isOpen }) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }
  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое меcто"
      isOpen={isOpen}
      buttonText={onLoading ? `Сохранение` : `Создать`}
      onSubmit={handleSubmit}
      onClose={onClose}>
      <label className="form popup__form">
        <input
          className="form__input form__input_info_title"
          type="text"
          name="name"
          id="place-name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={placeName}
          onChange={handleChangePlaceName}
          required />
        <span className="place-name-error form__input-error"></span>
      </label>
      <label className="form popup__form">
        <input
          className="form__input form__input_info_link"
          type="url"
          name="link"
          id="link-url"
          placeholder="Ссылка на картинку"
          value={placeLink}
          onChange={handleChangePlaceLink}
          required />
        <span className="link-url-error form__input-error"></span>
      </label>
    </PopupWithForm>

  )
}

export default AddPlacePopup