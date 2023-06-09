import React, { useState } from "react";


function Login({ loggedIn, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // меняем инпут
  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  // меняем инпут
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }
  // отправляем форму
  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="auth__form" noValidate>
      <h2 className="auth__title">Вход</h2>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        className="auth__input"
        onChange={handleEmailChange}
        autoComplete="off"
      />

      <input
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        value={password}
        className="auth__input"
        onChange={handlePasswordChange}
        autoComplete="off"
      />
      <button type="submit" className="auth__button">
        Войти
      </button>
    </form>

  );
}
export default Login;