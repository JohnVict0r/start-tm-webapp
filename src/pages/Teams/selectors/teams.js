import { createSelector } from 'reselect';

// eslint-disable-next-line
export const makeTeamSelector = ({ id }) =>
  createSelector(
    state => state.entities.teams,
    teams => teams[id]
  );
