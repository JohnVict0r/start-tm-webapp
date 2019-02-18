import { createSelector } from 'reselect';

// eslint-disable-next-line
export const usersSelector = createSelector(
  state => state.admin.users,
  state => state.entities.users,
  state => state.entities.roles,
  (collection, users, roles) => {
    const items = collection.items.map(item => ({
      user: users[item.user],
      role: roles[item.role],
    }));
    return {
      items,
      pagination: collection.pagination,
    };
  }
);
