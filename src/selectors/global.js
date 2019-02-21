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

export const makeCardCommentsSelector = ({ cardId }) =>
  createSelector(
    state => (state.comments.cards[cardId] ? state.comments.cards[cardId] : []),
    state => state.entities.comments,
    (collection, roles) => collection.map(id => roles[id])
  );

export const systemRolesSelector = createSelector(
  state => state.global.roles,
  state => state.entities.roles,
  (collection, roles) =>
    collection
      .map(id => roles[id])
      .filter(role => ['Administrador', 'Gerente', 'Colaborador'].includes(role.name))
);

export const statusSelector = createSelector(
  state => state.entities.status,
  state => state.global.status,
  (status, items) => items.map(i => status[i])
);
