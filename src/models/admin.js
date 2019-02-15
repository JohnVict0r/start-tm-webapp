import { loadUsers } from '@/services/admin';

const initialPaginatioState = {
  count: 0,
  currentPage: 0,
  links: [],
  perPage: 0,
  total: 0,
  totalPages: 0,
};

export default {
  namespace: 'admin',
  state: {
    items: [],
    pagination: initialPaginatioState,
  },

  effects: {
    *fetchUsers(_, { call, put }) {
      const response = yield call(loadUsers);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveItems',
        payload: {
          items: response.result,
          pagination: response.pagination,
        },
      });
    },
  },

  reducers: {
    receiveItems(state, { payload }) {
      return {
        ...state,
        items: payload.items,
        pagination: payload.pagination,
      };
    },
  },
};
