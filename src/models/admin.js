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
    users: {
      items: [],
      pagination: initialPaginatioState,
    },
  },

  effects: {
    *fetchUsers(_, { call, put }) {
      const response = yield call(loadUsers);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveUsers',
        payload: {
          items: response.result,
          pagination: response.pagination,
        },
      });
    },
  },

  reducers: {
    receiveUsers(state, { payload }) {
      return {
        ...state,
        users: {
          ...state.users,
          items: payload.items,
          pagination: payload.pagination,
        },
      };
    },
  },
};
