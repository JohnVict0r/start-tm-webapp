import callApi from '@/utils/callApi';
import schema from './Schema';

export const moveCard = ({ cardId, fromCardListId, toCardListId, position }) =>
  callApi(`cards/${cardId}`, schema.BOARD).post({
    from_card_list_id: fromCardListId,
    to_card_list_id: toCardListId,
    position,
  });

export const createCard = ({ cardListId, card }) =>
  callApi(`cardlists/${cardListId}/cards`, schema.BOARD).post({ ...card });

export const updateCard = ({ id, card }) => callApi(`cards/${id}`, schema.CARD).put({ ...card });

export const assignUser = ({ id, userId }) =>
  callApi(`cards/${id}/members/${userId}`, schema.CARD).put();

export const unAssignUser = ({ id, userId }) =>
  callApi(`cards/${id}/members/${userId}`, schema.CARD).delete();

export const createAttachment = ({ file, cardId }) =>
  callApi(`cards/${cardId}/attachments`, schema.USER).post(file);
