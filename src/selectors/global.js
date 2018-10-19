import { createSelector } from 'reselect';

// eslint-disable-next-line
export const rolesSelector = createSelector(
  state => state.global.roles,
  state => state.entities.roles,
  (collection, roles) =>
    collection
      .map(id => roles[id])
      .filter(role => ['Proprietário', 'Gerente', 'Colaborador'].includes(role.name))
);
