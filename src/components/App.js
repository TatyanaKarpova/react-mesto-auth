import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { auth } from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App () {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isShowFullImagePopupOpen, setIsShowFullImagePopupOpen] = useState(false);
  const [isConfirmDeleteCardPopupOpen, setIsConfirmDeleteCardPopup] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const [isRenderLoading, setIsRenderLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [userLoginData, setUserLoginData] = useState('');

  const navigate = useNavigate();
/*
  useEffect(() => {
    api
      .getUserProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []); */

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return;
    }
    api
      .setToken(token);
    api
      .getInitialCards()
      .then(([user, cards]) => {
        setCards(cards.cards.reverse());
        setCurrentUser(user);
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);


  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      auth.checkToken(jwt)
        .then(user => {
          if (user) {
            setLoggedIn(true);
            setUserLoginData(user.email);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsInfoTooltipPopupOpen(true);
        })
    }
  }, [navigate, loggedIn, setIsInfoTooltipPopupOpen]);

  useEffect(() => {
    if (loggedIn) {
      navigate.push('/');
    }
  }, [navigate, loggedIn]);


  function handleUpdateUser (newProfileInfo) {
    setIsRenderLoading(true);

    api
      .editProfileInfo(newProfileInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsRenderLoading(false));
  };

  function handleUpdateAvatar (newAvatar) {
    setIsRenderLoading(true);

    api
      .updateAvatar(newAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsRenderLoading(false));
  };

  function handleAddPlaceSubmit (newPlace) {
    setIsRenderLoading(true);

    api
      .addNewCards(newPlace.name, newPlace.link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsRenderLoading(false));
  };

  function handleRegisterUser (email, password) {
    auth
      .registerNewUser (email, password)
      .then ((newUser) => {
        if (newUser) {
          setIsInfoTooltipPopupOpen(true);
          setIsLoginSuccess(true);
          navigate.push('/sign-in');
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setIsLoginSuccess(false);
        console.log(err);
        navigate.push('/sign-up');
      })
  };

  function handleLoginUser (email, password) {
    setUserLoginData(email);
    auth
      .loginUser (email, password)
      .then ((user) => {
        if (user.token) {
          setLoggedIn (true);
          setIsLoginSuccess(true);
          localStorage.setItem ('jwt', user.token);
          navigate.push('/');
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setIsLoginSuccess(false);
        console.log(err)
      })
  };

  function handleLogoutUser () {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setIsLoginSuccess(false);
    navigate.push('/sign-in');
  };
 
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  };

  function handleCardClick (card) {
    setIsShowFullImagePopupOpen(true);
    setSelectedCard(card);
  };

  function handleDeleteCardClick (card) {
    setIsConfirmDeleteCardPopup(true);
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsShowFullImagePopupOpen(false);
    setIsConfirmDeleteCardPopup(false);
    setIsRenderLoading(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  };

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
        
      api
        .changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err));
  };

  function handleCardDelete (card) {
    setIsRenderLoading(true);

    api
      .deleteCard(card._id)
      .then(() => {
        setCards(items => items.filter(item => item._id !== card._id));
        closeAllPopups();
    })
      .catch((err) => console.log(err))
      .finally(() => setIsRenderLoading(false));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__container'>
          <Routes>
            <Route path='/' element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={
                  <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick} 
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCardClick}
                  loggedOut={handleLogoutUser}
                  userLoginData={userLoginData}
                  />
                }
              />
            }>
            </Route>
            <Route 
              path='/sign-up' element={
                <Register onRegister={handleRegisterUser} />
              }>
            </Route>
            <Route 
              path='/sign-in' element={
                <Login onLogin={handleLoginUser} />
              }>
            </Route>

            <Route 
              path='*' 
              element={
                <Navigate to='/sign-in' />
              }>
            </Route>
          </Routes>

          <Footer/>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isRenderLoading={isRenderLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isRenderLoading={isRenderLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isRenderLoading={isRenderLoading}
          />

          <ImagePopup
            isOpen={isShowFullImagePopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />

          <ConfirmDeleteCardPopup
            isOpen={isConfirmDeleteCardPopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
            onDeleteCard={handleCardDelete}
            isRenderLoading={isRenderLoading}
          />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isRegistrationSuccess={isLoginSuccess}
            regSuccessful='Вы успешно зарегестрировались!'
            regFailed='Что-то пошло не так! Попробуйте еще раз.'
          />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;