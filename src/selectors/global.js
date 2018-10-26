import { createSelector } from 'reselect';

export const loggedInUserSelector = createSelector(
  state => state.global.loggedInUser,
  state => state.entities.users,
  (loggedInUser, users) => (loggedInUser ? users[loggedInUser] : {})
);

export const rolesSelector = createSelector(
  state => state.global.roles,
  state => state.entities.roles,
  (collection, roles) =>
    collection
      .map(id => roles[id])
      .filter(role => ['Proprietário', 'Gerente', 'Colaborador'].includes(role.name))
);
