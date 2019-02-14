import { createSelector } from 'reselect';

// eslint-disable-next-line
export const usersSelector = createSelector(
  state => state.admin.users,
  state => state.entities.users,
  (collection, users) => ({
    items: collection.items.map(item => users[item]),
    pagination: collection.pagination,
  })
);
