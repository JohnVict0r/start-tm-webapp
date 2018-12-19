import callApi from '@/utils/callApi';
import schema from './Schema';

// eslint-disable-next-line
export const createTed = ted => callApi(`teds`, schema.TED).post(ted);
