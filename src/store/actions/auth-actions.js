import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
} from '../constants/action-types';

import { showFlashAlert } from './ui-actions';

/** AUTH LOGIN ACTIONS */
export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export const authLoginSuccess = (
  isLogged,
  currentUsername,
  currentEmail,
  currentUserId,
) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: {
    isLogged,
    currentUsername,
    currentEmail,
    currentUserId,
  },
});

export const login = credentials =>
  async function (dispatch, getstate, { history, api }) {
    dispatch(authLoginRequest());
    try {
      const authData = await api.auth.login(credentials);
      const { tokenJWT, username, userEmail, _id } = authData;
      dispatch(authLoginSuccess(!!tokenJWT, username, userEmail, _id));
      dispatch(showFlashAlert({ type: 'success', message: 'Login correcto!' }));
      history.push('/adverts');
    } catch (error) {
      dispatch(showFlashAlert({ type: 'error', message: error.message }));
      dispatch(authLoginFailure(error));
    }
  };

/** AUTH LOGOUT ACTIONS */
export const authLogoutRequest = () => ({
  type: AUTH_LOGOUT_REQUEST,
});

export const authLogoutFailure = error => ({
  type: AUTH_LOGOUT_FAILURE,
  error: true,
  payload: error,
});

export const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
  payload: {
    isLogged: false,
    currentUsername: null,
    currentEmail: null,
  },
});

export const logout = () =>
  function (dispatch, getState, { history, api }) {
    dispatch(authLogoutRequest());
    api.auth
      .logout()
      .then(() => {
        dispatch(authLogoutSuccess());
        dispatch(
          showFlashAlert({
            type: 'success',
            message: 'Hasta pronto!',
          }),
        );
        history.push('/');
      })
      .catch(error => {
        dispatch(authLogoutFailure(error));
        dispatch(showFlashAlert({ type: 'error', message: error.message }));
      });
  };
