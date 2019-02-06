import { createSelector } from 'reselect';

// eslint-disable-next-line
export const boardUsersSelector = createSelector(
  state => Object.keys(state.entities.users),
  state => state.entities.users,
  (collection, users) => collection.map(id => users[id])
);
