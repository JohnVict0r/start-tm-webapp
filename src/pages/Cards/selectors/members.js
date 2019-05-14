import { createSelector } from 'reselect';

// eslint-disable-next-line
export const cardSelectorWithMembers = ({ cardId }) =>
  createSelector(
    state => state.entities.cards,
    state => state.entities.users,
    (cards, users) => {
      const card = cards[cardId];
      if (card) {
        const members = card.members.map(member => users[member]);
        const assignees = card.assignees.map(member => users[member]);
        return { ...card, members, assignees };
      }

      return undefined;
    }
  );

