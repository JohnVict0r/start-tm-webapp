import request from '@/utils/request';
import callApi from '@/utils/callApi';
import schema from './Schema';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export const loadLoggedInUser = () => callApi('me', schema.USER).get();
