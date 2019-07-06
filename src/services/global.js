import { callApi } from '@/utils/callApi';
import schema from './Schema';

// eslint-disable-next-line
export const loadStatus = () => callApi(`status`, schema.STATUS_ARRAY).get();
