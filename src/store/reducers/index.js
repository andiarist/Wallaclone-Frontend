import * as types from '../constants/action-types';

export const initialState = {
  auth: {
    isLogged: false,
    currentUsername: '',
    currentUserId: '',
    currentEmail: '',
  },
  adverts: {
    tags: [],
    pages: 1,
    ads: [],
    adDetail: null,
  },
  ui: {
    loading: false,
    error: null,
    alert: null,
  },
};

export const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      return action.payload;
    case types.AUTH_LOGOUT_SUCCESS:
      return initialState.auth;
    case types.USERS_SIGNUP_SUCCESS:
      return action.payload;
    case types.USER_EDIT_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const adverts = (state = initialState.adverts, action) => {
  switch (action.type) {
    case types.ADVERTS_TAGS_SUCCESS:
      return { ...state, tags: action.payload };
    case types.ADVERTS_LOAD_SUCCESS:
      return { ...state, pages: action.payload.pages, ads: action.payload.ads };
    case types.ADVERT_LOAD_SUCCESS:
      return { ...state, adDetail: action.payload };
    case types.ADVERTS_CREATE_SUCCESS:
      return {
        ...state,
        ads: [action.payload, ...state.ads],
        adDetail: action.payload,
      };
    case types.ADVERTS_UPDATE_SUCCESS:
      return {
        ...state,
        adDetail: action.payload,
      };
    case types.ADVERTS_SET_AD_STATE:
      return {
        ...state,
        adDetail: { ...state.adDetail, state: action.payload },
      };
    case types.ADVERTS_SET_AD_FAV:
      return {
        ...state,
        ads: state.ads.map(ad => {
          if (ad._id === action.payload._id) {
            return action.payload;
          }
          return ad;
        }),
        adDetail: action.payload,
      };
    case types.ADVERTS_DELETE_SUCCESS:
      if (!state.ads) return { ...state, adDetail: null };
      return {
        ...state,
        ads: [...state.ads.filter(ad => ad._id !== action.payload)],
        adDetail: null,
      };
    case types.USER_FAV_ADVERTS_SUCCESS:
      return { ...state, ads: action.payload };
    case types.USER_SOLD_ADVERTS_SUCCESS:
      return { ...state, ads: action.payload };
    case types.USER_RESERVED_ADVERTS_SUCCESS:
      return { ...state, ads: action.payload };
    default:
      return state;
  }
};

export const ui = (state = initialState.ui, action) => {
  if (action.error) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  }

  if (/REQUEST/.test(action.type)) {
    return { ...state, loading: true };
  }

  if (/SUCCESS/.test(action.type)) {
    return {
      ...state,
      loading: false,
      error: null,
    };
  }

  if (action.type === types.UI_SET_ALERT) {
    return {
      ...state,
      alert: action.payload,
    };
  }

  if (action.type === types.UI_RESET) {
    return {
      ...state,
      loading: false,
      error: null,
      alert: null,
    };
  }
  return state;
};
