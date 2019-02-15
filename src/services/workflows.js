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

export const createWorkflowNode = (workflowId, node) =>
  callApi(`workflows/${workflowId}/wf_nodes`, schema.WORKFLOW).post(node);

export const updateWorkflowNode = (nodeId, node) =>
  callApi(`wf_nodes/${nodeId}`, schema.WORKFLOW).put(node);

export const deleteWorkflowNode = nodeId => callApi(`wf_nodes/${nodeId}`, schema.WORKFLOW).delete();

export const deleteWorkflowTransition = transitionId =>
  callApi(`wf_transitions/${transitionId}`, schema.WORKFLOW).delete();

export const createWorkflowTransition = (workflowId, transition) =>
  callApi(`workflows/${workflowId}/wf_transitions`, schema.WORKFLOW).post(transition);
