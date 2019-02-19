import { createSelector } from 'reselect';

// eslint-disable-next-line
export const usersSelector = createSelector(
  state => state.search.users,
  state => state.entities.users,
  (collection, users) => collection.map(id => users[id])
);
