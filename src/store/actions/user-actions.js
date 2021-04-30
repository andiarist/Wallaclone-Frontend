// COMPLETE: Creado un action como modelo, reemplazar por los nuevos actions

import {
  USERS_SIGNUP_REQUEST,
  USERS_SIGNUP_SUCCESS,
  USERS_SIGNUP_FAILURE,
  USERS_SIGNUP_CONFIRM_REQUEST,
  USERS_SIGNUP_CONFIRM_SUCCESS,
  USERS_SIGNUP_CONFIRM_FAILURE,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
} from '../constants/action-types';

import { getIsLoggedUser, getUserId } from '../selectors';
import storage from '../../utils/storage';
import { logout } from './auth-actions';
import { showFlashAlert } from './ui-actions';

/** USER ACTIONS */
export const userDeleteRequest = () => ({
  type: USER_DELETE_REQUEST,
});

export const userDeleteFailure = error => ({
  type: USER_DELETE_FAILURE,
  error: true,
  payload: error,
});

export const userDeleteSuccess = () => ({
  type: USER_DELETE_SUCCESS,
});

export const deleteUser = () =>
  async function (dispatch, getstate, { history, api }) {
    dispatch(userDeleteRequest());
    try {
      await api.users.deleteUser();

      dispatch(userDeleteSuccess());

      dispatch(
        showFlashAlert({ type: 'success', message: 'Cuenta Eliminada!' }),
      );
      // eslint-disable-next-line no-use-before-define
      await dispatch(logout());
    } catch (error) {
      dispatch(showFlashAlert({ type: 'error', message: error.message }));
      dispatch(userDeleteFailure(error));
    }
  };

/** SIGNUP ACTIONS */
export const usersSignupRequest = () => ({
  type: USERS_SIGNUP_REQUEST,
});

export const usersSignupFailure = error => ({
  type: USERS_SIGNUP_FAILURE,
  error: true,
  payload: error,
});

export const usersSignupSuccess = (currentUsername, currentEmail) => ({
  type: USERS_SIGNUP_SUCCESS,
  payload: {
    isLogged: false,
    currentUsername,
    currentEmail,
  },
});

export const signup = data =>
  // eslint-disable-next-line func-names
  async function (dispatch, getstate, { history, api }) {
    dispatch(usersSignupRequest());
    try {
      const response = await api.users.signup(data);
      const { user } = response;
      dispatch(usersSignupSuccess(user.username, user.email));
      // TODO generar página estática solicitando que revise correo para verificar email
      history.push('/signup');
    } catch (error) {
      console.log(error.message);
      dispatch(usersSignupFailure(error));
    }
  };

/** CONFIRM SIGNUP ACTIONS */
export const usersSignupConfirmRequest = () => ({
  type: USERS_SIGNUP_CONFIRM_REQUEST,
});

export const usersSignupConfirmFailure = error => ({
  type: USERS_SIGNUP_CONFIRM_FAILURE,
  error: true,
  payload: error,
});

export const usersSignupConfirmSuccess = () => ({
  type: USERS_SIGNUP_CONFIRM_SUCCESS,
});

export const signupConfirm = data =>
  async function (dispatch, getstate, { history, api }) {
    dispatch(usersSignupConfirmRequest());
    try {
      const response = await api.users.signupConfirm(data);
      console.log(response);
      dispatch(usersSignupConfirmSuccess());
      // TODO decidir a donde enviar tras confirmar
      // history.push('/login');
      // TODO se recarga la aplicación tras esto ?¿?
    } catch (error) {
      console.log(error.message);
      dispatch(usersSignupConfirmFailure(error));
    }
  };
/** EDIT USER */

export const userEditRequest = () => ({
  type: USER_EDIT_REQUEST,
});
export const userEditFailure = error => ({
  type: USER_EDIT_FAILURE,
  error: true,
  payload: error,
});
export const userEditSuccess = (
  isLogged,
  currentUsername,
  currentUserId,
  currentEmail,
) => ({
  type: USER_EDIT_SUCCESS,
  payload: {
    isLogged,
    currentUsername,
    currentUserId,
    currentEmail,
  },
});

export const editUser = (currentUsername, dataForUpdate) =>
  async function (dispatch, getstate, { history, api }) {
    const state = getstate();
    const isLogged = getIsLoggedUser(state);
    const userId = getUserId(state);
    dispatch(userEditRequest());
    const storageData = storage.get('auth');

    try {
      const { username, userEmail } = await api.users.updateUser(
        currentUsername,
        dataForUpdate,
      );

      dispatch(userEditSuccess(isLogged, username, userId, userEmail));
      if (storageData) {
        const { tokenJWT } = storageData;
        const auth = { tokenJWT, username, userEmail, userId };
        storage.set('auth', auth);
      }

      dispatch(
        showFlashAlert({
          type: 'success',
          message: 'Tus datos han sido actualizados',
        }),
      );

      history.push(`/user/${username}`);
    } catch (error) {
      dispatch(showFlashAlert({ type: 'error', message: error.message }));
      dispatch(userEditFailure(error));
    }
  };
