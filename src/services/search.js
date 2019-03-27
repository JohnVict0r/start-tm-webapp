import { stringify } from 'qs';
import callApi from '@/utils/callApi';
import schema from './Schema';

export const queryUserInProject = ({ id, query }) =>
  callApi(`users/search/projects/${id}?${stringify({ query, c: 1 })}`, schema.USER_ARRAY).get();

export const queryUserNotInProject = ({ id, query }) =>
  callApi(`users/search/projects/${id}?${stringify({ query, c: 0 })}`, schema.USER_ARRAY).get();
