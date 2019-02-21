import callApi from '@/utils/callApi';
import schema from './Schema';

export const loadUsers = () => callApi(`users`, schema.USERMEMBER_ARRAY).get();

export const removeUser = ({ userId }) =>
  callApi(`users/${userId}`, schema.TEAMMEMBER_ARRAY).delete();

export const changeUserRole = ({ userId, roleId }) =>
  callApi(`users/${userId}/access`, schema.PROJECTMEMBER_ARRAY).put(roleId);
