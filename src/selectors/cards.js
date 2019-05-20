import { createSelector } from 'reselect';

// eslint-disable-next-line
export const cardSelector = createSelector(
  (state, props) => state.entities.cards[props.cardId],
  (card) => card
);
