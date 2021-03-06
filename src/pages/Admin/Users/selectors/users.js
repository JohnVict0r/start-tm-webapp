import { createSelector } from 'reselect';

// eslint-disable-next-line
export const userUpdateSelector = createSelector(
  state => state.updateUser.item,
  state => state.entities.users,
  state => state.entities.roles,
  (item, users, roles) => {
    const user = users[item.user];
    const role = roles[item.role];
    return {
      ...user,
      role,
    };
  }
);
