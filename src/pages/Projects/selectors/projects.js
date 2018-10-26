import { createSelector } from 'reselect';

export const exploreProjectsSelector = createSelector(
  state => state.projects.explore,
  state => state.entities.projects,
  (explore, projects) => ({
    items: explore.items.map(id => projects[id]),
    pagination: explore.pagination,
  })
);

export const projectBoardsSelector = createSelector(
  state => state.projects.currentProject.boards,
  state => state.entities.boards,
  (collection, boards) => collection.map(id => boards[id])
);
