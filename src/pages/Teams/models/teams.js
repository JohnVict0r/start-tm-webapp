import { loadTeam, loadBoard } from '@/services/teams';

export default {
  namespace: 'teams',

  state: {
    currentBoard: null
  },

  effects: {
    *fetchTeam({ payload }, { call, put }) {
      const response = yield call(loadTeam, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });
    },

    *fetchBoard({ payload }, { call, put }) {
      const response = yield call(loadBoard, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveBoard',
        payload: response.result,
      });
    },
  },

  reducers: {
    receiveBoard(state, { payload }) {
      return {
        ...state,
        currentBoard: payload
      };
    },
  },
};
