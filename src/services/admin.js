import callApi from '@/utils/callApi';
import schema from './Schema';

// eslint-disable-next-line
export const loadUsers = () => callApi(`users`, schema.USER_ARRAY).get();
