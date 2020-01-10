import { stringify } from 'qs';
import { callApi } from '@/utils/callApi';

export const loadAthletesByClubId = ({ club_id, page }) =>
  callApi(`athletes?${stringify({ page, club_id })}`).get();

export const createAthlete = ({ athlete }) => callApi(`athletes`, null, true).post(athlete);

export const uploadAthlete = ({ athlete, id }) => callApi(`athletes/${id}`).put(athlete);

export const loadAthlete = id => callApi(`athletes/${id}`, null, true).get();
