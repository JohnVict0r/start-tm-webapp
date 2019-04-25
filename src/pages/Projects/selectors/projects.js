import { createSelector } from 'reselect';

export const exploreProjectsSelector = createSelector(
  state => state.projects.explore,
  state => state.entities.projects,
  state => state.entities.users,
  (explore, projects) => ({
    items: explore.items.map(id => projects[id]),
    pagination: explore.pagination,
  })
);

export const projectTeamsSelector = createSelector(
  state => state.projects.currentProject.teams,
  state => state.entities.teams,
  (collection, teams) => collection.map(id => teams[id])
);

export const makeProjectSelector = ({ id }) =>
  createSelector(
    state => state.entities.projects,
    projects => projects[id]
  );

export const makeBoardSelector = ({ boardId }) =>
  createSelector(
    state => state.entities.boards,
    boards => boards[boardId]
  );
