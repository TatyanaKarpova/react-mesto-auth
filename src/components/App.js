import { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
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

  const [userEmail, setUserEmail] = useState('');

  const history = useHistory();

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
  }, []);

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
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setIsLoginSuccess(false);
        console.log(err)
      })
  };

  function handleLoginUser (email, password) {
    auth
      .loginUser (email, password)
      .then ((user) => {
        if (user.token) {
          setLoggedIn (true);
          setUserEmail (email);
          history.push('/');
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setIsLoginSuccess(false);
        console.log(err)
      })
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
          <Header/>

          <Switch>
            <ProtectedRoute
              exact path='/'
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
            />

            <Route 
              path='/sign-up'
            >
              <Register onRegister={handleRegisterUser} />
            </Route>

            <Route 
              path='/sign-in'
            >
              <Login onLogin={handleLoginUser} />
            </Route>

            <Route>
              {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
            </Route>

            
          </Switch>

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
            regStatus={isLoginSuccess}
          />
          
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;