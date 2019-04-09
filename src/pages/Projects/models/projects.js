import { loadUserProjects, loadProject, favoriteProject } from '@/services/projects';
import { loadProjectTeams } from '@/services/teams';

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
    currentProject: {
      teams: [],
    },
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

    *fetchProject({ payload }, { call, put }) {
      const response = yield call(loadProject, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveItem',
        payload: {
          item: response.result,
        },
      });
    },

    *fetchProjectTeams({ payload }, { call, put }) {
      const response = yield call(loadProjectTeams, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveTeams',
        payload: response.result,
      });
    },

    *favoriteProject({ payload }, { call, put }) {
      const response = yield call(favoriteProject, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
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
    receiveTeams(state, { payload }) {
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          teams: payload,
        },
      };
    },
  },
};
