import { createProject, updateProject } from '@/services/projects';
import router from 'umi/router';
import { notification } from 'antd';

export default {
  namespace: 'saveProject',

  state: {
    error: null,
  },

  effects: {
    *save({ payload }, { call, put }) {
      const response = payload.id
        ? yield call(updateProject, payload)
        : yield call(createProject, payload);
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
          message: payload.id ? 'Projeto atualizado' : 'Projeto criado',
        });
        router.push(`/projects/${response.result}`);
      }
    },
  },

  reducers: {
    handleError(state, { payload }) {
      return {
        ...state,
        error: payload,
      };
    },
  },
};
