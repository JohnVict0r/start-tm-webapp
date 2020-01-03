import { callApi } from '@/utils/callApi';

export const createFederation = ({ federation }) => callApi(`federations`).post(federation);

export const uploadFederation = ({ federation, id }) =>
  callApi(`federations/${id}`).put(federation);

export const loadFederation = ({ federationId }) => callApi(`federations/${federationId}`).get();

export const loadFederations = () => callApi(`federations`).get();

export const deleteFederation = ({ federationId }) =>
  callApi(`federations/${federationId}`).delete();
