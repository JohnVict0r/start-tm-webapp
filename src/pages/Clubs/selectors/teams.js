import { createSelector } from 'reselect';

export const exploreTeamsSelector = createSelector(
  state => state.teams.explore,
  state => state.entities.teams,
  state => state.entities.users,
  (explore, teams) => ({
    items: explore.items.map(id => teams[id]),
    pagination: explore.pagination,
  })
);

export const makeTeamSelector = ({ id }) =>
  createSelector(
    state => state.entities.teams,
    teams => teams[id]
  );
