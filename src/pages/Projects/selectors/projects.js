import { createSelector } from 'reselect';

export const exploreProjectsSelector = createSelector(
  state => state.projects.explore,
  state => state.entities.projects,
  (explore, projects) => ({
    items: explore.items.map(id => projects[id]),
    pagination: explore.pagination,
  })
);

export const projectBoardsSelector = createSelector(
  state => state.projects.currentProject.boards,
  state => state.entities.boards,
  (collection, boards) => collection.map(id => boards[id])
);

export const makeBoardSelector = ({ boardId }) =>
  createSelector(
    state => state.entities.boards,
    state => state.entities.cardlists,
    state => state.entities.cards,
    state => state.entities.users,
    (boards, cardlists, cards, users) => {
      const board = boards[boardId];
      if (board) {
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
