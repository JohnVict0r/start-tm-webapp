import {callApi} from '@/utils/callApi';
import schema from './Schema';
import { stringify } from 'qs';

export const loadUserTeams = page =>
  callApi(`me/teams?${stringify({ page })}`, schema.TEAM_ARRAY).get();

export const loadProjectTeams = projectId =>
  callApi(`projects/${projectId}/teams`, schema.TEAM_ARRAY).get();

export const loadTeam = teamId => callApi(`teams/${teamId}`, schema.TEAM).get();

export const updateTeam = team => callApi(`teams/${team.id}`, schema.TEAM).put(team);

export const loadBoard = teamId => callApi(`teams/${teamId}/board`, schema.BOARD).get();

export const createTeam = ({ projectId, team }) =>
  callApi(`projects/${projectId}/teams`, null, true).post(team);

export const loadTeamMembers = ({ id }) =>
  callApi(`teams/${id}/members`, schema.TEAMMEMBER_ARRAY).get();

export const addTeamMember = (id, member) =>
  callApi(`teams/${id}/members`, schema.TEAMMEMBER_ARRAY).post(member);

export const deleteTeamMember = (teamId, member) =>
  callApi(`teams/${teamId}/members/${member}`, schema.TEAMMEMBER_ARRAY).delete();

export const changeTeamMemberRole = ({ teamId, memberId, role }) =>
  callApi(`teams/${teamId}/members/${memberId}/access`, schema.TEAMMEMBER_ARRAY).put({ role });
