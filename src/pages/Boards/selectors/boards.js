import { createSelector } from 'reselect';

export const makeBoardSelector = ({ id }) =>
  createSelector(
    state => state.entities.boards,
    (boards) => boards[id]
  );

export const makeBoardWithWorkflowSelector = ({ boardId }) =>
  createSelector(
    state => state.entities.boards,
    state => state.entities.cardlists,
    state => state.entities.cards,
    state => state.entities.users,
    (boards, cardlists, cards, users) => {
      const board = boards[boardId];
      if (board && board.cardlists) {
        const cardlistsArr = board.cardlists.map(item => cardlists[item]);
        const cardMap = cardlistsArr.reduce(
          (previous, cardlist) => ({
            ...previous,
            [cardlist.id]: cardlist.cards.map(item => {
              const members = cards[item].members.map(member => users[member]);
              return {
                ...cards[item],
                members,
              };
            }),
          }),
          {}
        );
        return { ...board, cardlists: cardlistsArr, cardMap };
      }

      return undefined;
    }
  );
