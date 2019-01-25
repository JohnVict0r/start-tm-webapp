import { notification } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';
import { listComments, deleteComment, updateComment, createComment } from '@/services/cards';

export default {
  namespace: 'commentCard',

  state: {
    availableWorkflows: [],
    validation: null,
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = call(listComments, payload);

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
      }
    },
    *delete({ payload }, { call, put }) {
      const response = call(deleteComment, payload);

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
            id: 'app.card.comment-deleted',
          }),
        });
      }
    },
    *save({ payload }, { call, put }) {
      const response = payload.id
        ? yield call(updateComment, payload)
        : yield call(createComment, payload);

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
