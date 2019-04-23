import { message } from 'antd';
import { createMilestone, loadMilestones } from '@/services/milestones';

export default {
  namespace: 'milestones',

  state: {
    validation: null,
    items: [],
  },

  effects: {
    *save({ payload }, { call, put }) {
      const response = payload.id
        ? // ? yield call(updateCard, payload)
          yield call(createMilestone, payload)
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

        yield put({
          type: 'fetch',
          payload,
        });
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
        validation: payload,
      };
    },
  },
};
