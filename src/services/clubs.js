import { stringify } from 'qs';
import { callApi } from '@/utils/callApi';

export const loadUserTeams = ({ page }) =>
  callApi(`me/teams?${stringify({ page })}`, null, true).get();

export const loadClubsByFederationId = ({ federation_id, page }) =>
  callApi(`clubs?${stringify({ page, federation_id })}`).get();

export const createClub = ({ club }) => callApi(`clubs`, null, true).post(club);

export const loadClub = id => callApi(`clubs/${id}`, null, true).get();

export const uploadClub = ({ club, id }) => callApi(`clubs/${id}`).put(club);
