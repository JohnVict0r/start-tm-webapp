import { callApi } from '@/utils/callApi';

export const createFederation = ({ federation }) => callApi(`federations`).post(federation);

export const loadFederation = ({ federationId }) => callApi(`federations/${federationId}`).get();

export const loadFederations = () => callApi(`federations`).get();
