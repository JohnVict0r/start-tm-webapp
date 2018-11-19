import callApi from '@/utils/callApi';
import schema from './Schema';

export const loadProjectBoards = projectId =>
  callApi(`projects/${projectId}/boards`, schema.BOARD_ARRAY).get();

export const loadBoard = boardId => callApi(`boards/${boardId}`, schema.BOARD).get();

export const createBoard = ({ projectId, board }) =>
  callApi(`projects/${projectId}/boards`, schema.BOARD).post(board);
