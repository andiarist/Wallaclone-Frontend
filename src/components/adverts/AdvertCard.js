import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import 'antd/dist/antd.css';

import FavoriteButton from '../shared/FavoriteButton';

import { getIsLoggedUser, getUserId } from '../../store/selectors';
import './AdvertCard.css';
import { getApiBaseUrl, getPublicUrl } from '../../config/envConfig';

const AdvertCard = ({
  _id,
  name,
  price,
  sale,
  description,
  state,
  tags,
  createdAt,
  thumb,
  isFavBy,
  createdBy,
}) => {
  const isLogged = useSelector(getIsLoggedUser);
  const userId = useSelector(getUserId);
  const { t } = useTranslation(['advertdetails']);
  const history = useHistory();
  const isFav = dataObj => {
    if (dataObj) {
      if (typeof dataObj[userId] === 'boolean') {
        return dataObj[userId];
      }
    }
    return false;
  };

  const renderIcons = () => {
    if (state === 'Reserved') {
      return (
        <img
          title={t('Reservado')}
          src={`${getPublicUrl()}/icons/reserved-30.png`}
          alt="Reserved"
        />
      );
    }
    if (state === 'Sold') {
      return (
        <img
          title={t('Vendido')}
          src={`${getPublicUrl()}/icons/sold-x-30.png`}
          alt="Sold"
        />
      );
    }
    return null;
  };

  const createdAtText = new Date(createdAt).toLocaleDateString();

  const { username } = createdBy;

  return (
    <>
      <Link className="card-link" to={`/adverts/view/${_id}`}>
        <article className="advert-tile hover-tile flex-item">
          <div
            className={`advert-tile-container ${
              state === 'Sold' ? 'advertcard-sold' : ''
            }`}
          >
            {username ? (
              <div className="advert-header">
                <div className="advert-author">
                  <button
                    type="button"
                    className="nav-button author-name"
                    onClick={ev => {
                      ev.preventDefault();
                      history.push(`/user/${username}`);
                    }}
                  >
                    {username}
                  </button>
                </div>

                <div className="icons">
                  <FavoriteButton
                    initialValue={isLogged ? isFav(isFavBy) : false}
                    adId={_id}
                  />
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="advert-tile-top">
              <div className="pod">
                {/* TODO Poner -higer-than-wider si el alto es mayor que el ancho. Poner -wider-than-higher si el ancho es mayor que el alto. */}
                {/* TODO Por defecto usar: container-higher-than-wider (para que el placeholder se vea bien) */}
                <div className="container-higher-than-wider">
                  <img
                    src={
                      thumb
                        ? `${getApiBaseUrl()}${thumb}`
                        : `${getApiBaseUrl()}/img/adverts/noAdImage.jpg`
                    }
                    alt={name}
                    className="advert-photo"
                  />
                </div>
              </div>
            </div>

            <div itemProp="name" className="advert-tile-bottom">
              <div className="icons">{renderIcons()}</div>
              <div className="advert-price">{price} €</div>
              <div className="advert-tile-title">
                <span>{name}</span>
              </div>
              <div className="tags">
                {tags.map(tag => (
                  <span className="tag" key={`${tag}${Date.now()}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="advert-desc">
                <span>{description}</span>
              </div>
              {state !== 'Sold' ? (
                <div
                  title={sale ? t('Se vende') : t('Se busca')}
                  className={sale ? 'advert-sell' : 'advert-buy'}
                >
                  {sale ? t('Se vende') : t('Se busca')}
                </div>
              ) : (
                <div
                  title={sale ? t('Vendido') : t('Encontrado')}
                  className="advert-sold"
                >
                  {sale ? t('Vendido') : t('Encontrado')}
                </div>
              )}
              <div className="advert-created">{createdAtText}</div>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
};

AdvertCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  sale: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  isFavBy: PropTypes.objectOf(PropTypes.any),
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  createdBy: PropTypes.objectOf(PropTypes.any),
};

AdvertCard.defaultProps = {
  tags: [],
  isFavBy: {},
  createdBy: {},
};

export default AdvertCard;
