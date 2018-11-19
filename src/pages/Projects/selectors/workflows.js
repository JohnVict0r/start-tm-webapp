import { createSelector } from 'reselect';

// eslint-disable-next-line
export const projectWorkflowsSelector = createSelector(
  state => state.currentProjectWorkflows,
  state => state.entities.workflows,
  (collection, workflows) => ({
    items: collection.items.map(id => workflows[id]),
    pagination: collection.pagination,
  })
);
