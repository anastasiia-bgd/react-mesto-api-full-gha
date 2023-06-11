import React from 'react';
import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import api from '../utils/Api.js';
import * as  auth from "../utils/auth.js";
import Header from './Header.js'
import Footer from './Footer';
import Main from './Main.js'
import ImagePopup from './ImagePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js'
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js'
import InfoTooltip from './InfoTooltip.js';
import okIcon from '../images/okIcon.jpg'
import failIcon from '../images/failIcon.jpg'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isInfoTolltipSuccess, setIsInfoTolltipSuccess] = useState(false);

  const isPopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isInfoTolltipSuccess ||
    selectedCard ||
    isSuccessPopupOpen;

  const navigate = useNavigate();

 

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
    setIsInfoTolltipSuccess(false)
    setIsSuccessPopupOpen(false)
  }

  function handleRegisterUser(email, password) {
    auth.registerUser(email, password)
      .then((data) => {
        console.log(data);
        if (data) {
          setIsInfoTolltipSuccess(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        setIsInfoTolltipSuccess(false);
        console.log(err);
      })
      .finally(() => setIsSuccessPopupOpen(true));
  }

  function handleAuthUser(email, password) {
    auth.loginUser(email, password)
      .then((data) => {
        console.log(data);
        // if (data) {
          setUserEmail(email);
          setLoggedIn(true);
          localStorage.setItem("jwt", data);
          navigate("/");
        // }
      })
      .catch((err) => {
        setIsInfoTolltipSuccess(false);
        setIsSuccessPopupOpen(true);
        console.log(err);
      });
  }
  
  function handleSingOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    // setUserEmail("");
    navigate("/signin");
  }

  // useEffect(() => {
  //   const token = localStorage.getItem("jwt");
  //   if (token) {
  //     console.log(token);
  //     api.getUserInfo()
  //       .then(([cardData, userData]) => {
  //         console.log(cardData);
  //         console.log(userData);
  //         setCurrentUser(userData);
  //         setCards(cardData)
  //       })
  //       .catch((err) => console.log(err))
  //   }
  // }, [loggedIn])

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth.checkToken(token)
        .then((data) => {
          setLoggedIn(true);
          setUserEmail(data.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [navigate]);

   useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([profileInfo, cardsData]) => {
          setCurrentUser(profileInfo);
          setCards(cardsData.reverse());
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, setCards]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);
    api.putLike(card._id, !isLiked)
      .then(newCard => setCards((
        state) => state.map(
          item => item._id === card._id ? newCard : item)))
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards(
        state => state.filter(
          item => item._id !== card._id)))
      .catch(err => console.log(err));
  }

  function handleUpdateUser(inputData) {
    // setIsLoading(true);
    api.setUserInfo(inputData)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      // .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatar) {
  setIsLoading(true);
    api.changeAvatar(avatar)
      .then(data => {
        console.log(data);
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(inputData) {
    // setIsLoading(true);
    api.addNewCard(inputData)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      // .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    function closeByEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isPopupOpen) {
      document.addEventListener("keydown", closeByEsc);
      return () => {
        document.removeEventListener("keydown", closeByEsc);
      };
    }
  }, [isPopupOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header userEmail={userEmail} onSignOut={handleSingOut} />
          <Routes>
            <Route path="/sign-in" element={<Login onLogin={handleAuthUser} />} />
            <Route path="/sign-up" element={<Register onRegister={handleRegisterUser} />} />
            <Route
              path="*"
              element={
                <ProtectedRoute
                  path="/"
                  element={Main}
                  onEditProfile={setIsEditProfilePopupOpen}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onAddPlace={setIsAddPlacePopupOpen}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />
          </Routes>
          {loggedIn && <Footer />}

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            // onLoading={isLoading}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            // onLoading={isLoading}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            // onLoading={isLoading}
            onUpdateUser={handleUpdateUser}
          />
          <InfoTooltip
            name={"success"}
            onClose={closeAllPopups}
            isOpen={isSuccessPopupOpen}
            text={isInfoTolltipSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
            image={isInfoTolltipSuccess ? okIcon : failIcon}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );

}

export default App;
