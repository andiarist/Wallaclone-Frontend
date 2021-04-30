/* eslint-disable react/self-closing-comp */
/* eslint-disable react/style-prop-object */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPublicUrl } from '../../../config/envConfig';

import './UserTools.css';

function UserTools({ currentUser }) {
  return (
    // TODO COMPONENTE CON LOS ENLACES DE NOTIFICACIONES QUE SE LLAMARÁ DESDE HEADER Y FOOTER
    <>
      <div className="usertools">
        <div className="imgwrapper">
          <Link className="nav-button" to="/adverts">
            <img src={`${getPublicUrl()}/icons/home-icon.svg`} alt="Home" />
          </Link>
        </div>
        <div className="imgwrapper">
          <Link className="nav-button" to={`/user/${currentUser}`}>
            <img
              src={`${getPublicUrl()}/icons/noti-menu-hover-30.png`}
              alt="Notifications"
            />
          </Link>
        </div>
        <div className="imgwrapper">
          <Link className="nav-button" to={`/user/${currentUser}/chats`}>
            <img src={`${getPublicUrl()}/icons/chat-icon.svg`} alt="Chat" />
          </Link>
        </div>
        <div className="imgwrapper">
          <Link className="nav-button" to={`/user/${currentUser}/favs`}>
            <img
              src={`${getPublicUrl()}/icons/fav-menu-hover-30.png`}
              alt="Favorites"
            />
          </Link>
        </div>
        <div className="imgwrapper">
          <Link className="nav-button" to="/adverts/new">
            <img src={`${getPublicUrl()}/icons/add-icon.svg`} alt="Create" />
          </Link>
        </div>
      </div>
    </>
  );
}

UserTools.propTypes = {
  currentUser: PropTypes.string,
};
UserTools.defaultProps = {
  currentUser: '',
};

export default UserTools;
