import callApi from '@/utils/callApi';
import schema from './Schema';

// eslint-disable-next-line
export const loadUsers = () => callApi(`users`, schema.USERMEMBER_ARRAY).get();

export const deleteUser = ({ userId }) =>
  callApi(`users/${userId}`, schema.TEAMMEMBER_ARRAY).delete();

export const putUserRole = ({ userId, roleId }) =>
  callApi(`users/${userId}/access`, schema.PROJECTMEMBER_ARRAY).put(roleId);
