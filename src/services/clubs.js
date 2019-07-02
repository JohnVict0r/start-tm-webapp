import { callApi } from '@/utils/callApi';
import { stringify } from 'qs';

export const loadUserTeams = ({ page }) =>
  callApi(`me/teams?${stringify({ page })}`, null, true).get();

export const loadClubsByFederationId = ({ federationId, page }) =>
  callApi(`federations/${federationId}/clubs?${stringify({ page })}`).get();
