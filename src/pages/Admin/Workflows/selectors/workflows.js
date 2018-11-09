import { createSelector } from 'reselect';

// eslint-disable-next-line
export const workflowsSelector = createSelector(
  state => state.workflows.workflows,
  state => state.entities.workflows,
  (collection, workflows) => ({
    items: collection.items.map(item => workflows[item]),
    pagination: collection.pagination,
  })
);
