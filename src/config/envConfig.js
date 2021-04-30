export const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_BASE_URL_PROD;
  }
  return process.env.REACT_APP_API_BASE_URL_DEV;
};

export const getPublicUrl = () => process.env.PUBLIC_URL;
