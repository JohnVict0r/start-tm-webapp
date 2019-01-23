import callApi from '@/utils/callApi';
import schema from './Schema';

export const loadAvailableWorkflowsForProject = projectId =>
  callApi(`projects/${projectId}/workflows/available`, schema.WORKFLOW_ARRAY).get();

export const loadWorkFlows = () => callApi('workflows', schema.WORKFLOW_ARRAY).get();

export const loadWorkflow = id => callApi(`workflows/${id}`, schema.WORKFLOW).get();

export const createWorkflow = ({ name, description }) =>
  callApi('workflows', schema.WORKFLOW).post({ name, description });

export const createWorkflowForTeam = (teamId, { name, description }) =>
  callApi(`teams/${teamId}/workflows`, schema.WORKFLOW).post({ name, description });

export const createWorkflowForProject = (projectId, { name, description }) =>
  callApi(`projects/${projectId}/workflows`, schema.WORKFLOW).post({ name, description });
