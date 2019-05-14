import { createSelector } from 'reselect';

export const makeMilestoneSelector = ({ id }) =>
  createSelector(
    state => state.entities.milestones,
    milestones => milestones[id]
  );

export const exploreMilestoneCardsSelector = createSelector(
  state => state.milestoneCards.explore,
  state => state.entities.cards,
  (explore, cards) => ({
    items: explore.items.map(id => cards[id]),
    pagination: explore.pagination,
  })
);
