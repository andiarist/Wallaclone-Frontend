import client, {
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from './client';

import storage from '../utils/storage';

export const login = credentials =>
  client.post('/apiv1/users/auth', credentials).then(auth => {
    const { remember } = credentials;
    if (remember) {
      storage.set('auth', auth);
    }
    const { tokenJWT } = auth;
    setAuthorizationHeader(tokenJWT);
    return auth;
  });

export const logout = () =>
  new Promise(resolve => {
    removeAuthorizationHeader();
    storage.remove('auth');
    resolve();
  });
export default login;
