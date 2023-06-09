import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ onLoading, onClose, onUpdateAvatar, isOpen }) {
    const avatarRef = useRef(null);

    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    function handleChangeAvatar() {
        return avatarRef.current.value;
    }

    return (<PopupWithForm
        name="change-avatar"
        title="Обновить аватар"
        isOpen={isOpen}
        onClose={onClose}
        buttonText={onLoading ? `Сохранение...` : `Сохранить`}
        onSubmit={handleSubmit}>
        <label className="form popup__form" name="form_change-avatar">
            <input
                className="form__input form__input_text_info"
                name="link"
                id="url-avatar-image"
                type="url"
                placeholder="Ссылка на новый аватар"
                onChange={handleChangeAvatar}
                ref={avatarRef}
                required />
            <span className="url-avatar-image-error form__input-error"></span>
        </label>
    </PopupWithForm>
    )
}

export default EditAvatarPopup