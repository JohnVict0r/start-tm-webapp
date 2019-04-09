import callApi from '@/utils/callApi';
import schema from './Schema';

export const loadProjectTeams = projectId =>
  callApi(`projects/${projectId}/teams`, schema.TEAM_ARRAY).get();

export const loadTeam = teamId => callApi(`teams/${teamId}`, schema.TEAM).get();

export const loadBoard = teamId => callApi(`teams/${teamId}/board`, schema.BOARD).get();

export const createTeam = ({ projectId, team }) =>
  callApi(`projects/${projectId}/teams`, schema.TEAM).post(team);
