import request from '@/utils/request';
import schema from './Schema';
import { callApi } from '@/utils/callApi';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

// export const loadLoggedInUser = () => callApi('me?include=role', schema.USER).get();

export const loadLoggedInUser = () => callApi('sessions/me', schema.USER).get();

export const loadFavorites = () => callApi('me/favorites').get();

export const updateLoggedInUserInfo = ({ name }) => callApi('me', schema.USER).put({ name });

export const updateAvatar = file => callApi('me/avatar', schema.USER).post(file);

export const updateLoggedInUserPassword = ({ currentPassword, password, passwordConfirmation }) =>
  callApi('me/passsword', schema.USER).put({
    current_password: currentPassword,
    password,
    password_confirmation: passwordConfirmation,
  });
