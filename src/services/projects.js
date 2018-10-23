import { stringify } from 'qs';
import callApi from '@/utils/callApi';
import schema from './Schema';

// eslint-disable-next-line
export const loadUserProjects = page =>
  callApi(`me/projects?${stringify({ page })}`, schema.PROJECT_ARRAY).get();
