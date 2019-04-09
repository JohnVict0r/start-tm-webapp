import { createSelector } from 'reselect';

//eslint-disable-next-line
export const boardSelector = createSelector(
  state => state.teams.currentBoard,
  state => state.entities.boards,
  state => state.entities.cardlists,
  state => state.entities.cards,
  state => state.entities.users,
  (currentBoard, boards, cardlists, cards, users) => {
    const board = boards[currentBoard];
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
