import { loadUserProjects, loadProject, createProject, updateProject } from '@/services/projects';
import { loadProjectBoards } from '@/services/boards';
import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';

const initialPaginatioState = {
  count: 0,
  currentPage: 0,
  links: [],
  perPage: 0,
  total: 0,
  totalPages: 0,
  error: null,
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
    error: null,
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

      // yield put({
      //   type: 'fetchProjectBoards',
      //   payload,
      // });

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

      notification.success({
        message: `Projeto criado com sucesso!`,
      });
    },
    *editProject({ payload }, { call, put }) {
      const response = yield call(updateProject, payload);
      if (response.errors) {
        yield put({
          type: 'handleError',
          payload: response,
        });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        notification.success({
          message: formatMessage({ id: 'app.project.sucess-edited' }),
        });

        router.push(`/projects/${response.result}`);
      }
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
    handleError(state, { payload }) {
      return {
        ...state,
        error: payload,
      };
    },
  },
};
