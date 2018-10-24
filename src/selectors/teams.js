import { createSelector } from 'reselect';

// eslint-disable-next-line
export const masterOfTeamsSelector = createSelector(
  state => state.teams.masterOfTeams,
  state => state.entities.teams,
  (collection, teams) => collection.map(id => teams[id])
);
