import { listComments } from '@/services/cards';

export default {
  namespace: 'comments',

  state: {
    cards: {},
    metas: {},
  },

  effects: {
    *fetchCardComments({ payload }, { call, put }) {
      const response = yield call(listComments, payload);
      yield put({
        type: 'saveCardComments',
        payload: {
          ...payload,
          items: response.result,
        },
      });
      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });
    },
  },

  reducers: {
    saveCardComments(state, { payload }) {
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload.id]: [...payload.items],
        },
      };
    },
  },
};
