import React from "react";
import logo from "../images/logo.svg";
import { Routes, Route, Link } from 'react-router-dom';

function Header({userEmail, onSignOut}) {
  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo"/>
      <Routes>
        <Route
          path='/'
          element={
            <div className='header__container'>
              <p className='header__email'>{userEmail}</p>
              <Link to='/sign-in' className='header__exit' onClick={onSignOut}>Выйти</Link>
            </div>
          }
        />
        <Route
          path='/sign-up'
          element={
            <Link to='/sign-in' className='header__link'>Войти</Link>
          }
        />
        <Route
          path='/sign-in'
          element={
            <Link to='/sign-up' className='header__link'>Регистрация</Link>
          }
        />
      </Routes>
    </header>
  )
}

export default Header;




