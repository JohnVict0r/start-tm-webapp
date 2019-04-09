import { moveCard } from '@/services/cards';

export default {
  namespace: 'cards',

  state: {},

  effects: {
    *moveCard({ payload }, { call, put }) {
      const response = yield call(moveCard, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });
    },
  },

  reducers: {},
};
