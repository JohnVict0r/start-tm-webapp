import { createSelector } from 'reselect';

// eslint-disable-next-line
export const exploreProjectsSelector = createSelector(
  state => state.projects.explore,
  state => state.entities.projects,
  (explore, projects) => ({
    items: explore.items.map(id => projects[id]),
    pagination: explore.pagination,
  })
);
