import axios from 'axios';

const Chat = require('twilio-chat');

export const getToken = async email => {
  const response = await axios.get(
    `${process.env.REACT_APP_CHAT_BASE_URL}/token/${email}`,
  );
  const { data } = response;
  return data.token;
};

export const initChatClient = async email => {
  try {
    const token = await getToken(email);
    const client = await Chat.Client.create(token);

    client.on('tokenAboutToExpire', async () => {
      const tokenUp = await getToken(email);
      client.updateToken(tokenUp);
    });

    client.on('tokenExpired', async () => {
      const tokenUp = await getToken(email);
      client.updateToken(tokenUp);
    });

    return client;
  } catch (err) {
    throw new Error(err.message);
  }
};
