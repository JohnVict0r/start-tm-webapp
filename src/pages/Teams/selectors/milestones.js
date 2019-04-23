import { createSelector } from 'reselect';

// eslint-disable-next-line
export const milestonesSelector = createSelector(
  state => state.milestones.items,
  state => state.entities.milestones,
  state => state.entities.users,
  (collection, milestones, users) => {
    return collection.map(id => {
      const milestone = milestones[id];
      return { ...milestone, creator: users[milestone.creator] };
    });
  }
);
