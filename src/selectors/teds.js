import { createSelector } from 'reselect';

export const exploreTedsSelector = createSelector(
  state => state.teds.explore,
  state => state.entities.teds,
  (explore, teds) => ({
    items: explore.items.map(id => teds[id]),
    pagination: explore.pagination,
  })
);

export const makeTedSelector = ({ id }) =>
  createSelector(
    state => state.entities.teds,
    state => state.entities.users,
    (teds, users) => {
      const ted = teds[id];
      if (ted) {
        return {
          ...ted,
          creator: users[ted.creator],
        };
      }

      return undefined;
    }
  );
