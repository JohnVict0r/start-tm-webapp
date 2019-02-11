import { createSelector } from 'reselect';

// eslint-disable-next-line
export const exploreTedsSelector = createSelector(
  state => state.teds.explore,
  state => state.entities.teds,
  (explore, teds) => ({
    items: explore.items.map(id => teds[id]),
    pagination: explore.pagination,
  })
);
