import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Redirect, useParams } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import ChatCard from '../../chat/ChatCard';
import { initChatClient } from '../../../api/chat';
import { getUserId } from '../../../store/selectors';

import '../UserPage/UserPage.css';
import UserPageAside from '../UserPage/UserPageAside';
import Spinner from '../../shared/Spinner';

function UserChatsPage({ currentUsername, currentUserId }) {
  const [userChannels, setUserChannels] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const [userClient, setUserClient] = useState(null);
  const { username } = useParams();
  const userId = useSelector(getUserId);
  const { t } = useTranslation(['userpage']);

  const getUserChannels = async client => {
    const chan = await client.getSubscribedChannels();
    const uCh = chan.items.filter(
      ch =>
        typeof ch.friendlyName === 'string' && ch.friendlyName.includes(userId),
    );
    setUserChannels(uCh);
    setLoadingChats(false);
  };

  const handleDeleteChat = async ch => {
    setLoadingChats(true);
    await ch.leave();
    await getUserChannels(userClient);
  };
  useEffect(async () => {
    if (currentUsername === username) {
      const client = await initChatClient(currentUserId);
      setUserClient(client);
      getUserChannels(client);
    }
  }, []);

  const renderChats = () => {
    if (!userChannels) return null;

    return userChannels.map(ch => (
      <ChatCard
        key={ch.sid}
        adId={ch.friendlyName.split('-')[0]}
        room={ch.friendlyName}
        otherUserId={
          ch.friendlyName.split('-')[1] === userId
            ? ch.friendlyName.split('-')[2]
            : ch.friendlyName.split('-')[1]
        }
        onDelete={() => handleDeleteChat(ch)}
      />
    ));
  };

  return (
    <MainLayout title="">
      <div className="userPage">
        <div className="grid-container">
          <aside className="userPage-aside">
            <UserPageAside user={username} />
          </aside>
          <div className="userPage-content">
            {currentUsername === username ? (
              <>
                <h2>{t('Mis Conversaciones')}</h2>
                <div className="userPage-chatswrapper flex-container">
                  {loadingChats ? <Spinner /> : renderChats()}
                </div>
              </>
            ) : (
              <Redirect to={`/user/${username}`} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

UserChatsPage.propTypes = {
  currentUsername: PropTypes.string,
  currentUserId: PropTypes.string.isRequired,
};

UserChatsPage.defaultProps = {
  currentUsername: '',
};

export default UserChatsPage;
