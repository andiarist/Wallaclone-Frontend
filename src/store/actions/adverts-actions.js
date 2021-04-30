import {
  ADVERT_LOAD_REQUEST,
  ADVERT_LOAD_SUCCESS,
  ADVERT_LOAD_FAILURE,
  ADVERTS_LOAD_REQUEST,
  ADVERTS_LOAD_SUCCESS,
  ADVERTS_LOAD_FAILURE,
  ADVERTS_CREATE_REQUEST,
  ADVERTS_CREATE_SUCCESS,
  ADVERTS_CREATE_FAILURE,
  ADVERTS_UPDATE_REQUEST,
  ADVERTS_UPDATE_SUCCESS,
  ADVERTS_UPDATE_FAILURE,
  ADVERTS_TAGS_REQUEST,
  ADVERTS_TAGS_SUCCESS,
  ADVERTS_TAGS_FAILURE,
  ADVERTS_DELETE_REQUEST,
  ADVERTS_DELETE_SUCCESS,
  ADVERTS_DELETE_FAILURE,
  ADVERTS_SET_AD_STATE,
  ADVERTS_SET_AD_FAV,
} from '../constants/action-types';

import { getUsername } from '../selectors';
import { showFlashAlert } from './ui-actions';

/** ADVERT ACTIONS */
export const advertsLoadRequest = () => ({
  type: ADVERTS_LOAD_REQUEST,
});
export const advertsCreateRequest = () => ({
  type: ADVERTS_CREATE_REQUEST,
});
export const advertsUpdateRequest = () => ({
  type: ADVERTS_UPDATE_REQUEST,
});
export const advertsDeleteRequest = () => ({
  type: ADVERTS_DELETE_REQUEST,
});
export const advertsTagsRequest = () => ({
  type: ADVERTS_TAGS_REQUEST,
});

export const advertsLoadFailure = error => ({
  type: ADVERTS_LOAD_FAILURE,
  error: true,
  payload: error,
});
export const advertsCreateFailure = error => ({
  type: ADVERTS_CREATE_FAILURE,
  error: true,
  payload: error,
});
export const advertsUpdateFailure = error => ({
  type: ADVERTS_UPDATE_FAILURE,
  error: true,
  payload: error,
});
export const advertsDeleteFailure = error => ({
  type: ADVERTS_DELETE_FAILURE,
  error: true,
  payload: error,
});
export const advertsTagsFailure = error => ({
  type: ADVERTS_TAGS_FAILURE,
  error: true,
  payload: error,
});

// ADVERT BY ID
export const advertLoadRequest = () => ({
  type: ADVERT_LOAD_REQUEST,
});
export const advertLoadSuccess = adDetail => ({
  type: ADVERT_LOAD_SUCCESS,
  payload: adDetail,
});
export const advertLoadFailure = error => ({
  type: ADVERT_LOAD_FAILURE,
  error: true,
  payload: error,
});

export const advertsLoadSuccess = (pages, ads) => ({
  type: ADVERTS_LOAD_SUCCESS,
  payload: {
    pages,
    ads,
  },
});
export const advertsCreateSuccess = ad => ({
  type: ADVERTS_CREATE_SUCCESS,
  payload: ad,
});
export const advertsUpdateSuccess = ad => ({
  type: ADVERTS_UPDATE_SUCCESS,
  payload: ad,
});
export const advertsDeleteSuccess = adId => ({
  type: ADVERTS_DELETE_SUCCESS,
  payload: adId,
});
export const advertsTagsSuccess = tags => ({
  type: ADVERTS_TAGS_SUCCESS,
  payload: tags,
});
export const advertsSetAdState = state => ({
  type: ADVERTS_SET_AD_STATE,
  payload: state,
});
export const advertsSetAdFav = ad => ({
  type: ADVERTS_SET_AD_FAV,
  payload: ad,
});

export const loadAdvertDetail = advertId =>
  // eslint-disable-next-line func-names
  async function (dispatch, getState, { api }) {
    const { adverts } = getState();
    if (adverts.adDetail && adverts.adDetail._id === advertId) {
      return;
    }
    dispatch(advertLoadRequest());
    try {
      const { advert } = await api.adverts.getAdvertDetail(advertId);
      // console.log(advert);
      dispatch(advertLoadSuccess(advert));
    } catch (error) {
      dispatch(advertLoadFailure(error));
    }
  };

export const loadAdverts = formFilter =>
  // eslint-disable-next-line func-names
  async function (dispatch, getState, { api }) {
    dispatch(advertsLoadRequest());
    try {
      const { pages, adverts } = await api.adverts.getAdverts(formFilter);
      dispatch(advertsLoadSuccess(pages, adverts));
    } catch (error) {
      dispatch(advertsLoadFailure(error));
    }
  };

export const createAdvert = advertData =>
  async function (dispatch, getState, { history, api }) {
    dispatch(advertsCreateRequest());
    try {
      const { advert } = await api.adverts.createAdvert(advertData);
      await dispatch(advertsCreateSuccess(advert));
      dispatch(showFlashAlert({ type: 'success', message: 'Anuncio creado!' }));
      history.push(`/adverts/view/${advert._id}`);
    } catch (error) {
      dispatch(showFlashAlert({ type: 'error', message: error.message }));
      await dispatch(advertsCreateFailure(error));
    }
  };

export const updateAdvert = (adId, advertData) =>
  async function (dispatch, getState, { history, api }) {
    dispatch(advertsUpdateRequest());
    try {
      const { advert } = await api.adverts.updateAdvert(adId, advertData);
      await dispatch(advertsUpdateSuccess(advert));
      dispatch(
        showFlashAlert({ type: 'success', message: 'Anuncio editado!' }),
      );
      history.push(`/adverts/view/${advert._id}`);
    } catch (error) {
      dispatch(showFlashAlert({ type: 'error', message: error.message }));
      await dispatch(advertsUpdateFailure(error));
    }
  };

export const deleteAdvert = advertId =>
  // eslint-disable-next-line func-names
  async function (dispatch, getState, { history, api }) {
    const state = getState();
    const user = getUsername(state);
    dispatch(advertsDeleteRequest());
    try {
      await api.adverts.deleteAdvert(advertId);

      await dispatch(advertsDeleteSuccess(advertId));
      dispatch(
        showFlashAlert({ type: 'success', message: 'Anuncio eliminado!' }),
      );
      history.push(`/user/${user}`);
    } catch (error) {
      dispatch(showFlashAlert({ type: 'error', message: error.message }));
      await dispatch(advertsDeleteFailure(error));
    }
  };

export const loadTags = () =>
  async function (dispatch, getState, { api }) {
    const { adverts } = getState();
    // If have tags, no make request to api
    if (adverts.tags.length) return;
    dispatch(advertsTagsRequest());
    try {
      const { tags } = await api.adverts.getAllTags();
      dispatch(advertsTagsSuccess(tags));
    } catch (error) {
      dispatch(advertsTagsFailure(error));
    }
  };
