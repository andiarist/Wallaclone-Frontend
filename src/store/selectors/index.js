export const getAuthUser = state => state.auth;

export const getIsLoggedUser = state => state.auth.isLogged;
export const getUsername = state => state.auth.currentUsername;
export const getUserEmail = state => state.auth.currentEmail;
export const getUserId = state => state.auth.currentUserId;

export const getUi = state => state.ui;
export const getUiLoading = state => state.ui.loading;
export const getAdverts = state => state.adverts.ads;
export const getPages = state => state.adverts.pages;

export const getAdvertDetail = state => state.adverts.adDetail;
export const getTags = state => state.adverts.tags;

export const getIsFavAdvert = state => {
  if (state.adverts.adDetail) return state.adverts.adDetail.isFavBy;
  return null;
};
