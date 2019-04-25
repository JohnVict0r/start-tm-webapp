import { createComment, listComments } from '@/services/comments';

export default {
  namespace: 'comments',

  state: {
    items: [],
    validation: null,
  },

  effects: {
    *save({ payload }, { call, put }) {
      const response = yield call(createComment, payload);

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
          type: 'saveComments',
          payload: response.result,
        });
      }
    },

    *fetchComments({ payload }, { call, put }) {
      const response = yield call(listComments, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'saveComments',
        payload: response.result,
      });
    },
  },

  reducers: {
    saveComments(state, { payload }) {
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
