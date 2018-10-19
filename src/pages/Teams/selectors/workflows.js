import { createSelector } from 'reselect';

// eslint-disable-next-line
export const teamWorkflowsSelector = createSelector(
  state => state.currentTeamWorkflows,
  state => state.entities.workflows,
  (collection, workflows) => ({
    items: collection.items.map(id => workflows[id]),
    pagination: collection.pagination,
  })
);
