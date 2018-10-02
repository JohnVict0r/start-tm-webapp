import { stringify } from 'qs';
import callApi from '@/utils/callApi';
import schema from './Schema';

// eslint-disable-next-line
export const loadUserTeams = page =>
  callApi(`me/teams?${stringify({ page })}`, schema.TEAM_ARRAY).get();
export const createTeam = team => callApi(`teams`, schema.TEAM).post(team);
