import callApi from '@/utils/callApi';
import schema from './Schema';
import { stringify } from 'qs';

export const loadUserTeds = page =>
  callApi(`me/teds?${stringify({ page })}`, schema.TED_ARRAY).get();

export const loadTed = id => callApi(`teds/${id}`, schema.TED).get();

export const createTed = ted => callApi(`teds`, schema.TED).post(ted);
