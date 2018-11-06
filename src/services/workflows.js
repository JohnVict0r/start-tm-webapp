import callApi from '@/utils/callApi';
import schema from './Schema';

// eslint-disable-next-line
export const loadWorkFlows = () => callApi('workflows', schema.WORKFLOW_ARRAY).get();
