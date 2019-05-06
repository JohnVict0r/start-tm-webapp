import { stringify } from 'qs';
import callApi from '@/utils/callApi';
import schema from './Schema';

export const loadUsers = ({page}) => callApi(`users?${stringify({ page })}`, schema.USERMEMBER_ARRAY).get();

export const removeUser = ({ userId }) =>
  callApi(`users/${userId}`, schema.TEAMMEMBER_ARRAY).delete();

export const changeUserRole = ({ userId, role }) =>
  callApi(`users/${userId}/access`, schema.USERMEMBER_ARRAY).put({ role });
