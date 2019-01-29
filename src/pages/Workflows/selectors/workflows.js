import { createSelector } from 'reselect';

// eslint-disable-next-line
export const makeWorkflowsSelector = ({ workflowId }) =>
  createSelector(
    state => state.entities.workflows,
    state => state.entities.workflowNodes,
    state => state.entities.workflowTransitions,
    state => state.entities.status,
    (workflows, workflowNodes, workflowTransitions, status) => {
      const workflow = workflows[workflowId];
      if (workflow) {
        const transitionsArr = workflow.transitions.map(item => workflowTransitions[item]);
        const nodesArr = workflow.nodes.map(item => workflowNodes[item]);
        const list = workflow.nodes.map(item => ({
          ...workflowNodes[item],
          trasitions: transitionsArr
            .filter(trans => trans.outWorkflowNodeId === item)
            .map(transition => workflowNodes[transition.inWorkflowNodeId].name),
          status: status[workflowNodes[item].status],
        }));
        return { ...workflow, nodes: nodesArr, list, transitions: transitionsArr };
      }
      return undefined;
    }
  );

export const makeWorkflowNodeSelector = ({ workflowId }) =>
  createSelector(
    state => state.entities.workflows,
    state => state.entities.workflowNodes,
    (workflows, workflowNodes) => {
      const workflow = workflows[workflowId];
      if (workflow) {
        const nodesArr = workflow.nodes.map(item => workflowNodes[item]);

        return { ...workflow.nodes, nodes: nodesArr };
      }
      return undefined;
    }
  );
