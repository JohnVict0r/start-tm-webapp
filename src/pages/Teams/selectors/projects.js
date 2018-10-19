import { createSelector } from 'reselect';

// eslint-disable-next-line
export const teamProjectsSelector = createSelector(
  state => state.currentTeamProjects,
  state => state.entities.projects,
  (collection, projects) => ({
    items: collection.items.map(id => projects[id]),
    pagination: collection.pagination,
  })
);
