import callApi from '@/utils/callApi';
import schema from './Schema';

export const moveCard = ({ cardId, fromCardListId, toCardListId, position }) =>
  callApi(`cards/${cardId}`, schema.BOARD).post({
    from_card_list_id: fromCardListId,
    to_card_list_id: toCardListId,
    position,
  });

export const loadCard = cardId => callApi(`cards/${cardId}`, schema.CARD).get();

export const createCard = ({ cardListId, card }) =>
  callApi(`cardlists/${cardListId}/cards`, schema.BOARD).post({ ...card });

export const updateCard = ({ id, card }) => callApi(`cards/${id}`, schema.CARD).put({ ...card });

export const assignUser = ({ id, userId }) =>
  callApi(`cards/${id}/members/${userId}`, schema.CARD).put();

export const unAssignUser = ({ id, userId }) =>
  callApi(`cards/${id}/members/${userId}`, schema.CARD).delete();

export const createFile = ({ file, cardId }) =>
  callApi(`cards/${cardId}/files`, schema.CARD).post(file);

export const deleteFile = ({ cardId, fileId }) =>
  callApi(`cards/${cardId}/files/${fileId}`, schema.CARD).delete();

export const assignMilestone = ({ id, milestoneId }) =>
  callApi(`cards/${id}/milestone/${milestoneId}`, schema.CARD).put();

export const unassignMilestone = ({ id }) => callApi(`cards/${id}/milestone`, schema.CARD).delete();

export const assigneeUser = ({ id, userId }) =>
  callApi(`cards/${id}/assignee/${userId}`, schema.CARD).put();

export const unAssigneeUser = ({ id, userId }) =>
  callApi(`cards/${id}/assignee/${userId}`, schema.CARD).delete();
