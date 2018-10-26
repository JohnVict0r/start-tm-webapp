import { loadUserProjects, loadProject, createProject } from '@/services/projects';
import { loadProjectBoards } from '@/services/boards';
import { routerRedux } from 'dva/router';
import { notification } from 'antd';

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
      boards: [],
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

    *fetchProjectBoards({ payload }, { call, put }) {
      const response = yield call(loadProjectBoards, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveBoards',
        payload: response.result,
      });
    },

    *createProject({ payload }, { call, put }) {
      const response = yield call(createProject, payload);

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

      yield put(routerRedux.push(`/projects/${response.result}`));

      yield put(
        notification.success({
          message: `Projeto criado com sucesso!`,
        })
      );
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
    receiveBoards(state, { payload }) {
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          boards: payload,
        },
      };
    },
  },
};
