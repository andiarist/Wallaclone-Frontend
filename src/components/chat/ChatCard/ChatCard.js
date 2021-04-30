/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { getUserId } from '../../../store/selectors';
import { getApiBaseUrl } from '../../../config/envConfig';
import { getAdvertDetail } from '../../../api/adverts';
import { getUserNameFromId } from '../../../api/users';

import ConfirmButton from '../../shared/ConfirmButton';

import './ChatCard.css';

const ChatCard = ({ adId, otherUserId, room, onDelete }) => {
  const { t } = useTranslation(['chat']);
  const history = useHistory();
  const userId = useSelector(getUserId);
  const [ad, setAd] = useState(null);
  const [otherUsername, setOtherUsername] = useState('');

  const handleClick = () => {
    history.push(`/chat`, {
      room,
      email: userId,
      adName: ad.name,
      owner: ad.createdBy,
      userToJoin:
        userId === room.split('-')[1] ? room.split('-')[2] : room.split('-')[1],
    });
  };

  useEffect(async () => {
    const { advert } = await getAdvertDetail(adId);
    const { username } = await getUserNameFromId(otherUserId);
    setAd(advert);
    setOtherUsername(username);
  }, []);

  return (
    ad && (
      <>
        <article className="chat-card">
          <div className="chat-card-link-wrapper">
            <Button className="chat-card-link" onClick={handleClick}>
              <div className="chat-card-photo-container">
                <img
                  src={
                    ad.thumb
                      ? `${getApiBaseUrl()}${ad.thumb}`
                      : `${getApiBaseUrl()}/img/adverts/noAdImage.jpg`
                  }
                  alt={ad.name}
                />
              </div>
              <div className="chat-card-name-username">
                <div className="chat-card-name">{ad.name}</div>
                <div className="chat-card-other-username">{otherUsername}</div>
              </div>
            </Button>
          </div>
          <div className="chat-card-deletebutton-container">
            <ConfirmButton
              className="chat-card-deletebutton"
              acceptAction={onDelete}
              confirmProps={{
                title: t('Eliminar Chat'),
                message: t('¿Estás seguro de eliminar el chat?'),
              }}
              typeButton="primary"
              icon={<DeleteOutlined className="site-form-item-icon" />}
              danger
            />
          </div>
        </article>
      </>
    )
  );
};
ChatCard.propTypes = {
  otherUserId: PropTypes.string.isRequired,
  adId: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ChatCard;
