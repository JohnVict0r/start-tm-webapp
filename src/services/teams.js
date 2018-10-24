import { stringify } from 'qs';
import callApi from '@/utils/callApi';
import schema from './Schema';

export const loadUserTeams = page =>
  callApi(`me/teams?${stringify({ page })}`, schema.TEAM_ARRAY).get();
export const loadUserMasterOfTeams = () => callApi(`me/teams/master`, schema.TEAM_ARRAY).get();
export const loadTeam = id => callApi(`teams/${id}`, schema.TEAM).get();
export const loadTeamProjects = ({ id, page }) =>
  callApi(`teams/${id}/projects?${stringify({ page })}`, schema.PROJECT_ARRAY).get();
export const loadTeamWorkflows = ({ id, page }) =>
  callApi(`teams/${id}/workflows?${stringify({ page })}`, schema.WORKFLOW_ARRAY).get();
export const loadWorkflowsAvailableForTeam = ({ id, page }) =>
  callApi(
    `teams/${id}/workflows?${stringify({ page, with: 'system_workflows' })}`,
    schema.WORKFLOW_ARRAY
  ).get();
export const loadTeamMembers = ({ id }) =>
  callApi(`teams/${id}/members`, schema.TEAMMEMBER_ARRAY).get();
export const createTeam = team => callApi(`teams`, schema.TEAM).post(team);
export const addTeamMember = (id, member) =>
  callApi(`teams/${id}/members`, schema.TEAMMEMBER_ARRAY).post(member);
