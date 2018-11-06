import callApi from '@/utils/callApi';
import schema from './Schema';

// eslint-disable-next-line
export const AdminWorkFlows = () => callApi('workflows', schema.ARRAY).get();
