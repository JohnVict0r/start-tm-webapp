import { createSelector } from 'reselect';

// eslint-disable-next-line
export const projectMembersSelector = createSelector(
  state => state.currentProjectMembers,
  state => state.entities.users,
  state => state.entities.roles,
  (collection, users, roles) =>
    collection.map(member => ({
      user: users[member.user],
      role: roles[member.role],
    }))
);
