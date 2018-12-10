import { stringify } from 'qs';
import callApi from '@/utils/callApi';
import schema from './Schema';

export const queryUserInTeam = ({ id, query }) =>
  callApi(`users/search/teams/${id}?${stringify({ query, c: 1 })}`, schema.USER_ARRAY).get();

export const queryUserNotInTeam = ({ id, query }) =>
  callApi(`users/search/teams/${id}?${stringify({ query, c: 0 })}`, schema.USER_ARRAY).get();
