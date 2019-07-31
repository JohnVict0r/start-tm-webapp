import { callApi } from '@/utils/callApi';

// eslint-disable-next-line
export const uploadAddress = ({ address, id }) => callApi(`address/${id}`).put(address);
