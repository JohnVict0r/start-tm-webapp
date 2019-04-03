import { message } from 'antd';
import router from 'umi/router';
import { loadAvailableWorkflowsForProject } from '@/services/workflows';
import { createBoard } from '@/services/boards';

export default {
  namespace: 'createBoard',

  state: {
    availableWorkflows: [],
    validation: null,
  },

  effects: {
    *fetchAvailableWorkflows({ payload }, { call, put }) {
      const response = yield call(loadAvailableWorkflowsForProject, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveWorkflows',
        payload: response.result,
      });
    },

    *create({ payload }, { call, put }) {
      const response = yield call(createBoard, payload);

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

        message.success('Quadro criado com sucesso!');

        // TODO não está indo para a rota
        router.push(`/boards/${response.result}`);
      }
    },
  },

  reducers: {
    receiveWorkflows(state, { payload }) {
      return {
        ...state,
        availableWorkflows: payload,
      };
    },

    handleError(state, { payload }) {
      return {
        ...state,
        validation: payload,
      };
    },
  },
};
