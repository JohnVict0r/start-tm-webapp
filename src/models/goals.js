import { loadGoals } from '@/services/goals';

export default {
  namespace: 'goals',

  state: {
    items: [],
  },

  effects: {
    *fetchTedGoals({ payload }, { call, put }) {
      const response = yield call(loadGoals, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveItems',
        payload: response.result,
      });
    },
  },

  reducers: {
    receiveItems(state, { payload }) {
      return {
        ...state,
        items: payload,
      };
    },
  },
};
