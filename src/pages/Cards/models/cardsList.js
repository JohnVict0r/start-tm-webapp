import Schema from '@/services/Schema';
import { loadMyCards } from '@/services/cards';

const initialPaginatioState = {
  count: 0,
  currentPage: 0,
  links: [],
  perPage: 0,
  total: 0,
  totalPages: 0,
};

export default {
  namespace: 'cardsList',

  state: {
    cards: [],
    pagination: initialPaginatioState,
  },

  reducers: {
    receiveItems(state, { payload }) {
      return {
        ...state,
        cards: payload.cards,
        pagination: payload.pagination,
      };
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const response = yield call(loadMyCards, payload);

        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data: response.data,
            schema: Schema.CARD_ARRAY,
          },
        });

        yield put({
          type: 'receiveItems',
          payload: {
            cards: result,
            pagination: response.meta.pagination,
          },
        });
      } catch (e) {
        // não faz nada.
      }
    },
  },
};
