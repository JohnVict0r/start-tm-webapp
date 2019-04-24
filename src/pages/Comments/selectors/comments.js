import { createSelector } from 'reselect/lib/index';

// eslint-disable-next-line
export const commentsSelector = createSelector(
  state => state.comments.items,
  state => state.entities.comments,
  state => state.entities.users,
  (collection, comments, users) => collection.map(id => {
    const comment = comments[id];
    return { ...comment, commented: users[comment.commented] };
  })
);

