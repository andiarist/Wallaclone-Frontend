import {
  USER_FAV_ADVERTS_REQUEST,
  USER_FAV_ADVERTS_SUCCESS,
  USER_FAV_ADVERTS_FAILURE,
  USER_SOLD_ADVERTS_REQUEST,
  USER_SOLD_ADVERTS_SUCCESS,
  USER_SOLD_ADVERTS_FAILURE,
  USER_RESERVED_ADVERTS_REQUEST,
  USER_RESERVED_ADVERTS_SUCCESS,
  USER_RESERVED_ADVERTS_FAILURE,
} from '../constants/action-types';

// USER ADVERTS

export const userFavAdvertsLoadRequest = () => ({
  type: USER_FAV_ADVERTS_REQUEST,
});
export const userFavAdvertsLoadSuccess = ads => ({
  type: USER_FAV_ADVERTS_SUCCESS,
  payload: ads,
});
export const userFavAdvertsLoadFailure = error => ({
  type: USER_FAV_ADVERTS_FAILURE,
  error: true,
  payload: error,
});

export const loadFavAdverts = () =>
  // eslint-disable-next-line func-names
  async function (dispatch, getState, { api }) {
    dispatch(userFavAdvertsLoadRequest());
    try {
      const { adverts } = await api.users.getUserFavs();
      dispatch(userFavAdvertsLoadSuccess(adverts));
    } catch (error) {
      dispatch(userFavAdvertsLoadFailure(error));
    }
  };

export const userSoldAdvertsLoadRequest = () => ({
  type: USER_SOLD_ADVERTS_REQUEST,
});
export const userSoldAdvertsLoadSuccess = ads => ({
  type: USER_SOLD_ADVERTS_SUCCESS,
  payload: ads,
});
export const userSoldAdvertsLoadFailure = error => ({
  type: USER_SOLD_ADVERTS_FAILURE,
  error: true,
  payload: error,
});

export const loadSoldAdverts = () =>
  // eslint-disable-next-line func-names
  async function (dispatch, getState, { api }) {
    dispatch(userSoldAdvertsLoadRequest());
    try {
      const { adverts } = await api.users.getUserSoldAdverts();
      dispatch(userSoldAdvertsLoadSuccess(adverts));
    } catch (error) {
      dispatch(userSoldAdvertsLoadFailure(error));
    }
  };

export const userReservedAdvertsLoadRequest = () => ({
  type: USER_RESERVED_ADVERTS_REQUEST,
});
export const userReservedAdvertsLoadSuccess = ads => ({
  type: USER_RESERVED_ADVERTS_SUCCESS,
  payload: ads,
});
export const userReservedAdvertsLoadFailure = error => ({
  type: USER_RESERVED_ADVERTS_FAILURE,
  error: true,
  payload: error,
});

export const loadReservedAdverts = () =>
  // eslint-disable-next-line func-names
  async function (dispatch, getState, { api }) {
    dispatch(userReservedAdvertsLoadRequest());
    try {
      const { adverts } = await api.users.getUserReservedAdverts();
      dispatch(userReservedAdvertsLoadSuccess(adverts));
    } catch (error) {
      dispatch(userReservedAdvertsLoadFailure(error));
    }
  };
