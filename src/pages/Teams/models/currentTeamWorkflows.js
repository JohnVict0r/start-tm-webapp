import { loadTeamWorkflows } from '@/services/teams';

const initialPaginatioState = {
  count: 0,
  currentPage: 0,
  links: [],
  perPage: 0,
  total: 0,
  totalPages: 0,
};

export default {
  namespace: 'currentTeamWorkflows',

  state: {
    items: [],
    pagination: initialPaginatioState,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(loadTeamWorkflows, payload);

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
