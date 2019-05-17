import {
  loadMyCards
} from '@/services/cards';

const initialPaginatioState = {
  count: 0,
  currentPage: 0,
  links: [],
  perPage: 0,
  total: 0,
  totalPages: 0,
};

export default {
  namespace: 'mycards',

  state: {
    cards: [],
    pagination: initialPaginatioState
  },

  reducers: {
    receiveItems(state, { payload }) {
      return {
        ...state,
        cards: payload.cards,
        pagination: payload.pagination
      };
    },
    handleError(state, { payload }) {
      return {
        ...state,
        validation: payload,
      };
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(loadMyCards, payload);

      if (!response.errors) {
        yield put({
          type: 'receiveItems',
          payload: {
            cards: response.data,
            pagination: response.meta.pagination
          }
        })
      }
    },
  }
};
