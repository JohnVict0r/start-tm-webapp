import { stringify } from 'qs';
import callApi from '@/utils/callApi';
import schema from './Schema';

export const loadUserTeams = page =>
  callApi(`me/teams?${stringify({ page })}`, schema.TEAM_ARRAY).get();
export const loadTeam = id => callApi(`teams/${id}`, schema.TEAM).get();
export const loadTeamProjects = ({ id, page }) =>
  callApi(`teams/${id}/projects?${stringify({ page })}`, schema.PROJECT_ARRAY).get();
export const createTeam = team => callApi(`teams`, schema.TEAM).post(team);
