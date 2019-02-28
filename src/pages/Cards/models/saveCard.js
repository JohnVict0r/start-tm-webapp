import { message } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';
import { createCard, updateCard, assignUser, unAssignUser } from '@/services/cards';

export default {
  namespace: 'saveCard',

  state: {
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

        message.success(
          formatMessage({
            id: payload.id ? 'app.card.sucess-updated' : 'app.card.sucess-created',
          })
        );

        if (!payload.id) {
          router.goBack();
        }
      }
    },

    *assigin({ payload }, { call, put }) {
      const response = yield call(assignUser, payload);
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

    *unAssigin({ payload }, { call, put }) {
      const response = yield call(unAssignUser, payload);
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
