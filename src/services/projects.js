import { stringify } from 'qs';
import callApi from '@/utils/callApi';
import schema from './Schema';

export const loadUserProjects = page =>
  callApi(`me/projects?${stringify({ page })}`, schema.PROJECT_ARRAY).get();

export const loadProject = id => callApi(`projects/${id}`, schema.PROJECT).get();

export const createProject = project => callApi(`projects`, schema.PROJECT).post(project);

export const updateProject = project =>
  callApi(`projects/${project.id}`, schema.PROJECT).put(project);

export const favoriteProject = id => callApi(`projects/${id}/favorite`, schema.PROJECT).post();

export const loadProjectWorkflows = ({ id, page }) =>
  callApi(`projects/${id}/workflows?${stringify({ page })}`, schema.WORKFLOW_ARRAY).get();

export const loadProjectMembers = ({ id }) =>
  callApi(`projects/${id}/members`, schema.PROJECTMEMBER_ARRAY).get();

export const addProjectMember = (id, member) =>
  callApi(`projects/${id}/members`, schema.PROJECTMEMBER_ARRAY).post(member);

export const deleteProjectMember = (projectId, member) =>
  callApi(`projects/${projectId}/members/${member}`, schema.PROJECTMEMBER_ARRAY).delete();

export const changeProjectMemberRole = ({ projectId, memberId, roleId }) =>
  callApi(`projects/${projectId}/members/${memberId}/access`, schema.PROJECTMEMBER_ARRAY).put(
    roleId
  );
