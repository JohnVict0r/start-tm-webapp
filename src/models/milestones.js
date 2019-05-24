import { message } from 'antd';
import {
  createMilestone,
  updateMilestone,
  loadMilestones,
  loadMilestone,
} from '@/services/milestones';
import router from 'umi/router';

export default {
  namespace: 'milestones',

  state: {
    error: null,
    items: [],
  },

  effects: {
    *save({ payload }, { call, put }) {
      const response = payload.id
        ? yield call(updateMilestone, payload)
        : yield call(createMilestone, payload);

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

        message.success(
          payload.id ? 'Entregável atualizado com sucesso' : 'Entregável criado com sucesso!'
        );

        router.push(`/milestones/${response.result}`);
      }
    },

    *fetch({ payload }, { call, put }) {
      const response = yield call(loadMilestones, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveItems',
        payload: response.result,
      });
    },

    *fetchMilestone({ payload }, { call, put }) {
      const response = yield call(loadMilestone, payload);

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
  },

  reducers: {
    receiveItems(state, { payload }) {
      return {
        ...state,
        items: payload,
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
