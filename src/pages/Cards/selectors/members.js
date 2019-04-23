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
        return { ...card, members };
      }

      return undefined;
    }
  );

export const projectMembersSelector = createSelector(
  state => state.currentProjectMembers,
  state => state.entities.users,
  state => state.entities.roles,
  (collection, users, roles) =>
    collection.map(member => ({
      user: users[member.user],
      role: roles[member.role],
    }))
);
