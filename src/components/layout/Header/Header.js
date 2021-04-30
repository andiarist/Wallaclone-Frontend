/* eslint-disable react/self-closing-comp */
/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Menu, Dropdown } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getPublicUrl } from '../../../config/envConfig';
import ConfirmButton from '../../shared/ConfirmButton/ConfirmButton';
import LangButton from '../../shared/LangButton';
import UserTools from '../../auth/UserTools';

import './Header.css';

function Header({ className, isLogged, onLogout, currentUser }) {
  const [isMobile, setMobile] = useState(window.innerWidth < 768);
  const [isSmall, setSmall] = useState(window.innerWidth > 450);

  // cambio
  const updateMedia = () => {
    setMobile(window.innerWidth < 768);
    setSmall(window.innerWidth > 450);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const [search, setSearch] = useState('');
  const history = useHistory();

  const handleSubmitSearch = event => {
    event.preventDefault();
    if (search !== '') {
      history.push(`/adverts?name=${search}`);
    } else {
      history.push('/adverts');
    }
    setSearch('');
  };

  const { t, i18n } = useTranslation(['header']);

  const menuLogin = (
    <Menu
      style={{ textAlign: 'center', backgroundColor: 'var(--bg-solid-color)' }}
    >
      <Menu.Item>
        <Link to={`/user/${currentUser}`}>{t('Mis datos')}</Link>
      </Menu.Item>
      <Menu.Item>
        <ConfirmButton
          acceptAction={() => onLogout()}
          confirmProps={{
            title: t('Cerrar sesión'),
            message: t('¿Estás seguro que quieres salir?'),
          }}
          typeButton="text"
        >
          {t('Cerrar sesión')}
        </ConfirmButton>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className={classNames('header', className)}>
      <div className="header-wrapper">
        <Link to="/" className="header-logo">
          <h1 className="walla-logo">{isSmall ? 'Wallaclone' : 'W'}</h1>
        </Link>

        <div className="header-search-input-wrapper">
          <form onSubmit={handleSubmitSearch}>
            <div className="searchContainer">
              <div className="searchIcon">
                <img alt="O" src={`${getPublicUrl()}/icons/search-icon.svg`} />
              </div>
              <input
                className="searchBox"
                type="text"
                placeholder={t('Buscar-puntos')}
                name="search"
                value={search}
                onChange={ev => {
                  setSearch(ev.target.value);
                }}
              />
              <input
                type="submit"
                value={t('Buscar')}
                className="searchButton"
              ></input>
            </div>
          </form>
        </div>
        {isLogged ? (
          <>
            {isMobile ? null : (
              <div className="user-tools-wrapper">
                <UserTools />
              </div>
            )}
            <div className="language-profile-wrapper">
              <LangButton initialLang={i18n.language} />
              <Dropdown
                overlay={menuLogin}
                placement="bottomRight"
                arrow
                trigger={['click']}
              >
                <img
                  src={`${getPublicUrl()}/icons/profile-menu-40.png`}
                  className="login-image"
                  alt="Profile"
                />
              </Dropdown>
            </div>
          </>
        ) : (
          <>
            <div className="language-profile-wrapper">
              <LangButton initialLang={i18n.language} />
              <Link className="nav-button" to="/login">
                <img
                  src={`${getPublicUrl()}/icons/profile-menu-40.png`}
                  className="login-image"
                  alt="Profile"
                />
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  isLogged: PropTypes.bool,
  onLogout: PropTypes.func,
  currentUser: PropTypes.string,
};
Header.defaultProps = {
  className: 'layout-header',
  isLogged: false,
  onLogout: PropTypes.func,
  currentUser: '',
};

export default Header;
