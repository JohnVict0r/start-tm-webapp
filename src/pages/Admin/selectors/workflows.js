import { createSelector } from 'reselect';

// eslint-disable-next-line
export const adminWorkflowsSelector = createSelector(
  state => state.currentAdminWorkflows,
  state => state.entities.workflows,
  (collection, workflows) => ({
    items: workflows, // TODO trabalhar com workflows de amin
  })
);
