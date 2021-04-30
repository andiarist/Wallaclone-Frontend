import client from './client';

const usersBaseUrl = '/apiv1/users';

export const resetPasswd = (passwd, hash) => {
  const url = `${usersBaseUrl}/forgotPass/confirmation`;
  // console.log(hash);
  // console.log(passwd);
  const params = JSON.stringify({
    passwd,
    hash,
  });
  return client.post(url, params, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const forgotPasswd = email => {
  const url = `${usersBaseUrl}/forgotPass`;
  const params = JSON.stringify({
    email,
  });
  return client.put(url, params, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const signup = async data => {
  const url = `${usersBaseUrl}`;
  const headers = { 'Content-Type': 'multipart/form-data' };
  const response = await client.post(url, data, headers);
  // console.log(response);
  return response;
};

export const signupConfirm = async data => {
  const url = `${usersBaseUrl}/confirm/${data}`;
  const response = await client.get(url);
  // console.log(response);
  return response;
};

export const updateUser = async (currentUsername, updateData) => {
  const response = await client.patch(
    `/apiv1/users/editUser/${currentUsername}`,
    updateData,
  );
  return response;
};

export const deleteUser = () => client.delete(usersBaseUrl);

export const setUnsetFav = async adId => {
  const url = `${usersBaseUrl}/favs/${adId}`;
  return client.post(url);
};
export const setUnsetSold = async adId => {
  const url = `${usersBaseUrl}/sold/${adId}`;
  return client.post(url);
};

export const setUnsetReserved = async adId => {
  const url = `${usersBaseUrl}/reservation/${adId}`;
  return client.post(url);
};

export const getUserFavs = async () => {
  const url = `${usersBaseUrl}/favs`;
  const response = await client.get(url);
  return response;
};

export const getUserSoldAdverts = async () => {
  const url = `${usersBaseUrl}/sold`;
  const response = await client.get(url);
  return response;
};

export const getUserReservedAdverts = async () => {
  const url = `${usersBaseUrl}/reserved`;
  const response = await client.get(url);
  return response;
};
export const getUserNameFromId = async userId => {
  const url = `${usersBaseUrl}/${userId}`;
  const response = await client.get(url);
  return response;
};
