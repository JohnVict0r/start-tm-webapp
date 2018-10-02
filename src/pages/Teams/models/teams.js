import { loadUserTeams } from '@/services/teams';

const initialPaginatioState = {
  count: 0,
  currentPage: 0,
  links: [],
  perPage: 0,
  total: 0,
  totalPages: 0,
};

export default {
  namespace: 'teams',

  state: {
    explore: {
      items: [],
      pagination: initialPaginatioState,
    },
  },

  effects: {
    *fetchUserTeams({ payload }, { call, put }) {
      const response = yield call(loadUserTeams, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'saveList',
        payload: {
          items: response.result,
          pagination: response.pagination,
        },
      });
    },
  },

  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        explore: {
          ...state.explore,
          items: payload.items,
          pagination: payload.pagination,
        },
      };
    },
  },
};
