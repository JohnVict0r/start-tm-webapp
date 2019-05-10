import { createSelector } from 'reselect';

export const makeMilestoneSelector = ({ id }) =>
  createSelector(
    state => state.entities.milestones,
    milestones => milestones[id]
  );
