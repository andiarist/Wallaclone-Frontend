/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import { useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getUserId } from '../../../store/selectors';
import FavoriteButton from '../../shared/FavoriteButton';
import ReserveButton from '../../shared/ReserveButton';
import SoldButton from '../../shared/SoldButton';
import Spinner from '../../shared/Spinner';

import MainLayout from '../../layout/MainLayout';
import ConfirmButton from '../../shared/ConfirmButton';

import './AdvertPage.css';
import { getApiBaseUrl, getPublicUrl } from '../../../config/envConfig';

function AdvertPage({
  match,
  isLogged,
  advert,
  onDelete,
  loadAdvertDetail,
  loading,
}) {
  const { id } = match.params;
  const history = useHistory();
  const { t } = useTranslation(['advertdetails']);

  const userId = useSelector(getUserId);
  const isFav = dataObj => {
    if (dataObj) {
      if (typeof dataObj[userId] === 'boolean') {
        return dataObj[userId];
      }
    }
    return false;
  };

  const handleChatClick = () => {
    if (!isLogged) {
      history.push('/login');
      return;
    }

    const room = `${id}-${advert.createdBy._id}-${userId}`;

    history.push(`/chat`, {
      room,
      email: userId,
      adName: advert.name,
      owner: advert.createdBy,
      userToJoin: advert.createdBy._id,
    });
  };

  const renderContent = () => {
    if (!advert) return null;

    return (
      <div className="advertpage-container">
        <div className="advertpage-advert-header">
          <div className="advertpage-author">
            <Link to={`/user/${advert.createdBy.username}`}>
              {advert.createdBy.username}
            </Link>
          </div>

          <div className="advertpage-actions">
            <div className="advertpage-favorite">
              <FavoriteButton
                initialValue={isLogged ? isFav(advert.isFavBy) : false}
                adId={advert._id}
              />
            </div>
            {advert.createdBy._id === userId ? (
              <>
                <div className="advertpage-edit">
                  <Button
                    type="dashed"
                    onClick={() => history.push(`/adverts/edit/${advert._id}`)}
                    icon={<EditOutlined className="site-form-item-icon" />}
                  >
                    <span className="button-text">{t('Editar')}</span>
                  </Button>
                </div>
                <div className="advertpage-deletebutton">
                  <ConfirmButton
                    acceptAction={() => onDelete(id)}
                    confirmProps={{
                      title: t('Eliminar Anuncio'),
                      message: t('¿Estás seguro de eliminar el anuncio?'),
                    }}
                    typeButton="primary"
                    icon={<DeleteOutlined className="site-form-item-icon" />}
                    danger
                  >
                    <span className="button-text">{t('Eliminar')}</span>
                  </ConfirmButton>
                </div>
              </>
            ) : (
              <Button onClick={handleChatClick} type="primary">
                {t('Chat')}
              </Button>
            )}
          </div>
        </div>
        <div className="advertpage-photo-container">
          <img
            alt="ad_photo"
            src={`${getApiBaseUrl()}${
              advert.image || '/img/adverts/noAdImage.jpg'
            }`}
          />
        </div>
        <div className="advertpage-reserved-sold">
          {advert.createdBy._id === userId ? (
            <>
              <div className="advertpage-reserved">
                {advert.state !== 'Sold' ? (
                  <ReserveButton
                    initialValue={advert.state === 'Reserved'}
                    adId={advert._id}
                  />
                ) : (
                  ''
                )}
              </div>
              <div className="advertpage-sold">
                <SoldButton
                  initialValue={advert.state === 'Sold'}
                  adId={advert._id}
                />
              </div>
            </>
          ) : (
            ''
          )}
        </div>
        <div className="advertpage-status-tags">
          <div className={`advertpage-status-${advert.state}`}>
            {advert.state === 'Reserved' ? (
              <>
                <img
                  className="favorite-icon"
                  src={`${getPublicUrl()}/icons/reserved-30.png`}
                  alt={advert.state}
                />{' '}
                {t('Reservado')}{' '}
              </>
            ) : (
              ''
            )}
            {advert.state === 'Sold' ? (
              <>
                <img
                  className="favorite-icon"
                  src={`${getPublicUrl()}/icons/sold-x-30.png`}
                  alt={advert.state}
                />{' '}
                {advert.sale ? t('Vendido') : t('Encontrado')}{' '}
              </>
            ) : (
              ''
            )}
            {advert.state === 'Available' ? t('Disponible') : ''}
          </div>
        </div>
        <div className="advertpage-title-price">
          <div className="advertpage-title">{advert.name}</div>
          <div className="advertpage-price">{advert.price} €</div>
        </div>
        <div className="advertpage-tags">
          {advert.tags.length > 0
            ? advert.tags.map(tag => (
                <span className="advertpage-tag" key={tag}>
                  {tag}
                </span>
              ))
            : ''}
        </div>
        <div
          className={
            advert.description
              ? 'advertpage-description'
              : 'advertpage-description-none'
          }
        >
          {advert.description ? advert.description : 'Sin descripción'}
        </div>

        <div className="advertpage-footer">
          {advert.state !== 'Sold' ? (
            <div className={advert.sale ? 'advertpage-sell' : 'advertpage-buy'}>
              {advert.sale ? t('Se vende') : t('Se busca')}
            </div>
          ) : (
            <div
              title={advert.sale ? t('Vendido') : t('Encontrado')}
              className="advertpage-sold-footer"
            >
              {advert.sale ? t('Vendido') : t('Encontrado')}
            </div>
          )}

          <div className="advertpage-created">
            {new Date(advert.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="advertpage-social">
          <div className="item">
            <FacebookShareButton url={window.location.href} quote={advert.name}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>
          <div className="item">
            <TwitterShareButton
              url={window.location.href}
              title={advert.name}
              hashtags={advert.tags}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
          <div className="item">
            <WhatsappShareButton url={window.location.href}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    loadAdvertDetail(id);
  }, []);

  return (
    <MainLayout title={t('Detalle del Anuncio')}>
      <div className="advertPage">
        {loading ? <Spinner /> : renderContent()}
      </div>
    </MainLayout>
  );
}

AdvertPage.propTypes = {
  isLogged: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  advert: PropTypes.objectOf(PropTypes.any),
  loadAdvertDetail: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

AdvertPage.defaultProps = {
  isLogged: false,
  match: [],
  advert: {},
};

export default AdvertPage;
