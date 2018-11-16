import { loadWorkFlows } from '@/services/workflows';

const initialPaginatioState = {
  count: 0,
  currentPage: 0,
  links: [],
  perPage: 0,
  total: 0,
  totalPages: 0,
};

export default {
  namespace: 'currentWorkflows',
  state: {
    workflows: {
      items: [],
      pagination: initialPaginatioState,
    },
  },

  effects: {
    *fetchCurrentWorkflows(_, { call, put }) {
      const response = yield call(loadWorkFlows);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveWorkflows',
        payload: {
          items: response.result,
          pagination: response.pagination,
        },
      });
    },
  },

  reducers: {
    receiveWorkflows(state, { payload }) {
      return {
        ...state,
        workflows: {
          ...state.workflows,
          items: payload.items,
          pagination: payload.pagination,
        },
      };
    },
  },
};
