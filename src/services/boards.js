import callApi from '@/utils/callApi';
import schema from './Schema';

// eslint-disable-next-line
export const loadProjectBoards = projectId =>
  callApi(`projects/${projectId}/boards`, schema.BOARD_ARRAY).get();
