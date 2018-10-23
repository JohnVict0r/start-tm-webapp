import { loadUserProjects } from '@/services/projects';

const initialPaginatioState = {
  count: 0,
  currentPage: 0,
  links: [],
  perPage: 0,
  total: 0,
  totalPages: 0,
};

export default {
  namespace: 'projects',

  state: {
    explore: {
      items: [],
      pagination: initialPaginatioState,
    },
  },

  effects: {
    *fetchUserProjects({ payload }, { call, put }) {
      const response = yield call(loadUserProjects, payload);

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
        explore: {
          ...state.explore,
          items: payload.items,
          pagination: payload.pagination,
        },
      };
    },
    receiveItem(state, { payload }) {
      return {
        ...state,
        explore: {
          ...state.explore,
          items: [...state.explore.items, payload.item],
        },
      };
    },
  },
};
