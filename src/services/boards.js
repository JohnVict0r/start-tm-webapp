import callApi from '@/utils/callApi';
import schema from './Schema';

export const loadBoard = teamId => callApi(`teams/${teamId}/board`, schema.BOARD).get();

export const createCardList = ({ teamId, cardList }) =>
  callApi(`teams/${teamId}/board/cardlists`, schema.BOARD).post(cardList);

export const updateCardList = ({ id, cardList }) =>
  callApi(`cardlists/${id}`, schema.BOARD).put(cardList);
