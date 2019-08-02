import { callApi } from '@/utils/callApi';

// eslint-disable-next-line
export const uploadAddress = ({ address, id }) => callApi(`addresses/${id}`).put(address);
