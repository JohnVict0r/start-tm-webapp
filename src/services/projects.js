import { stringify } from 'qs';
import callApi from '@/utils/callApi';
import schema from './Schema';

// eslint-disable-next-line
export const loadUserProjects = page =>
  callApi(`me/projects?${stringify({ page })}`, schema.PROJECT_ARRAY).get();
export const loadProject = id => callApi(`projects/${id}?include=boards`, schema.PROJECT).get();
export const createProject = ({ teamId, project }) =>
  callApi(`teams/${teamId}/projects`, schema.PROJECT).post(project);
export const updateProject = ({ project, id }) =>
  callApi(`projects/${id}`, schema.PROJECT).put(project);
export const loadProjectWorkflows = ({ id, page }) =>
  callApi(`projects/${id}/workflows?${stringify({ page })}`, schema.WORKFLOW_ARRAY).get();
