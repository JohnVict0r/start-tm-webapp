import callApi from '@/utils/callApi';
import schema from './Schema';

// eslint-disable-next-line
export const moveCard = ({ cardId, fromCardListId, toCardListId, position }) =>
  callApi(`cards/${cardId}`, schema.BOARD).post({
    from_card_list_id: fromCardListId,
    to_card_list_id: toCardListId,
    position,
  });
export const createCard = ({ cardListId,  card }) =>
  callApi(`cardlists/${cardListId}/cards`, schema.BOARD).post({...card});
export const updateCard = ({ id,  card }) =>
  callApi(`cards/${id}`, schema.BOARD).put({...card});
