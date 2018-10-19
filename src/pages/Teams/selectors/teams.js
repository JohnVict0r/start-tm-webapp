import { createSelector } from 'reselect';

// eslint-disable-next-line
export const exploreTeamsSelector = createSelector(
  state => state.teams.explore,
  state => state.entities.teams,
  (explore, teams) => ({
    items: explore.items.map(id => teams[id]),
    pagination: explore.pagination,
  })
);
