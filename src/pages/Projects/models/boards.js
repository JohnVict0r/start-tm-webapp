import { loadBoard } from '@/services/boards';

export default {
  namespace: 'boards',

  state: {},

  effects: {
    *fetchBoard({ payload }, { call, put }) {
      const response = yield call(loadBoard, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });
    },
  },

  reducers: {},
};
