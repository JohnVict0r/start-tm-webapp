import request from '@/utils/request';
import { returnParams, normalizeReponse } from '@/utils/apiParameters';
import callApi from '@/utils/callApi';
import schema from './Schema';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export const loadLoggedInUser = () => callApi('me', schema.USER).get();

export const updateLoggedInUserInfo = ({ name }) => callApi('me', schema.USER).put({ name });
export const updateLoggedInUserPassword = ({ currentPassword, password, passwordConfirmation }) =>
  callApi('me/passsword', schema.USER).put({
    current_password: currentPassword,
    password,
    password_confirmation: passwordConfirmation,
  });

export const updateLoggedUserPicProps = () => returnParams('me/avatar');

export const constructUserScehma = ({ data }) => normalizeReponse({ data }, schema.USER);
