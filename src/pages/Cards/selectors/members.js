import { createSelector } from 'reselect';

// eslint-disable-next-line
export const cardSelectorWithMembers = ({ cardId }) =>
  createSelector(
    state => state.entities.cards,
    state => state.entities.users,
    state => state.entities.milestones,
    (cards, users, milestones) => {
      const card = cards[cardId];
      if (card) {
        const members = card.members.map(member => users[member]);
        const assignees = card.assignees.map(member => users[member]);
        const milestone = card.milestone && milestones[card.milestone];
        return { ...card, members, assignees, milestone };
      }

      return undefined;
    }
  );
