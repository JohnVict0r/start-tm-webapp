import { notification } from 'antd';
import { formatMessage } from 'umi/locale';
import { deleteComment, updateComment, createComment } from '@/services/cards';

export default {
  namespace: 'commentCard',

  state: {
    validation: null,
  },

  effects: {
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteComment, payload);

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
        yield put({
          type: 'comments/saveCardComments',
          payload: {
            id:payload.cardId,
            items:response.result
          },
        });
      }
    },
  },

  reducers: {
    handleError(state, { payload }) {
      return {
        ...state,
        validation: payload,
      };
    },
  },
};
