import { stringify } from 'qs';
import callApi from '@/utils/callApi';
import schema from './Schema';

// eslint-disable-next-line
export const queryUser = ({ model, id, c = 1, query }) =>
  callApi(`users/search/${model}/${id}?${stringify({ query, c })}`, schema.USER_ARRAY).get();
