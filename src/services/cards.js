import callApi from '@/utils/callApi';
import schema from './Schema';

// eslint-disable-next-line
export const moveCard = ({ cardId, fromCardListId, toCardListId, position }) =>
  callApi(`cards/${cardId}`, schema.BOARD).post({
    from_card_list_id: fromCardListId,
    to_card_list_id: toCardListId,
    position,
  });
export const createCard = ({ cardListId, card }) =>
  callApi(`cardlists/${cardListId}/cards`, schema.CARD).post({ ...card });
export const updateCard = ({ id, card }) => callApi(`cards/${id}`, schema.CARD).put({ ...card });
export const assignUser = ({ id, userId }) =>
  callApi(`cards/${id}/members/${userId}`, schema.CARD).put();
export const unAssignUser = ({ id, userId }) =>
  callApi(`cards/${id}/members/${userId}`, schema.CARD).delete();
export const createComment = ({ cardId, comment }) =>
  callApi(`cards/${cardId}/comments`, schema.COMMENT_ARRAY).post({ ...comment });
export const listComments = ({ id }) => callApi(`cards/${id}/comments`, schema.COMMENT_ARRAY).get();
export const updateComment = ({ id, comment }) =>
  callApi(`comments/${id}`, schema.COMMENT_ARRAY).put({ ...comment });
export const deleteComment = ({ id }) => callApi(`comments/${id}`, schema.COMMENT_ARRAY).delete();
