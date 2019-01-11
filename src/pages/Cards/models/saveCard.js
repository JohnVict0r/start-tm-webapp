import { notification } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';
import { createCard, updateCard } from '@/services/cards';

export default {
  namespace: 'saveCard',

  state: {
    availableWorkflows: [],
    validation: null,
  },

  effects: {
    *save({ payload }, { call, put }) {
      const response = payload.id
        ? yield call(updateCard, payload)
        : yield call(createCard, payload);

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
          message: formatMessage({
            id: payload.id ? 'app.card.sucess-updated' : 'app.card.sucess-created',
          }),
        });
        router.push(`/projects/${payload.projectId}/boards/${payload.boardId}`);
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
