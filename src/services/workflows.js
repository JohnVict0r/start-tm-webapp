import callApi from '@/utils/callApi';
import schema from './Schema';

// eslint-disable-next-line
export const loadWorkFlows = () => callApi('workflows', schema.WORKFLOW_ARRAY).get();
export const createWorkflow = ({ name, description }) =>
  callApi('workflows', schema.WORKFLOW).post({ name, description });

export const createWorkflowForTeam = (teamId, { name, description }) =>
  callApi(`teams/${teamId}/workflows`, schema.WORKFLOW).post({ name, description });

export const createWorkflowForProject = (projectId, { name, description }) =>
  callApi(`projects/${projectId}/workflows`, schema.WORKFLOW).post({ name, description });
