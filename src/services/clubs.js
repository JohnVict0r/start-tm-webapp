import { callApi } from '@/utils/callApi';
import { stringify } from 'qs';

export const loadUserTeams = ({ page }) =>
  callApi(`me/teams?${stringify({ page })}`, null, true).get();

export const loadClubsByFederationId = ({ federation_id, page }) =>
  callApi(`clubs?${stringify({ page, federation_id })}`).get();

export const createClub = data => callApi(`clubs`, null, true).post(data);
