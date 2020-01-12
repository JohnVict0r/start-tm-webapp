import { stringify } from 'qs';
import { callApi } from '@/utils/callApi';

export const loadEventsByFederationId = ({ federation_id, page }) =>
  callApi(`ttevents?${stringify({ page, federation_id })}`).get();

export const createEvent = ({ event }) => callApi(`ttevents`, null, true).post(event);

export const uploadEvent = ({ event, id }) => callApi(`ttevents/${id}`).put(event);

export const loadEvent = id => callApi(`ttevents/${id}`, null, true).get();
