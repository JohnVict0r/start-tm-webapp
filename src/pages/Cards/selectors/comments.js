import { createSelector } from 'reselect';

// eslint-disable-next-line
export const cardCommentSelector = ({ cardId }) =>
  createSelector(
    state => state.entities.cards,
    state => state.entities,
    (cards, comments) => {
      const card = cards[cardId];

      if (card && comments.length) {
        return { ...card, comments };
      }

      return undefined;
    }
  );
