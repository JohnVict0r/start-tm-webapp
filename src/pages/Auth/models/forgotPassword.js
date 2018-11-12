import { forgotPassword } from '@/services/auth';

export default {
  namespace: 'forgotPassword',

  state: {
    error: null,
    sentToken: false,
  },

  effects: {
    *forgot({ payload }, { call, put }) {
      const response = yield call(forgotPassword, payload);
      if (response) {
        yield put({
          type: 'handleForgotPasswordError',
          payload: response,
        });
      } else {
        yield put({
          type: 'handleSentMail',
          payload: response,
        });
      }
    },
    *resetState(_, { put }) {
      yield put({
        type: 'handleResetState',
      });
    },
  },

  reducers: {
    handleForgotPasswordError(state, { payload }) {
      return {
        ...state,
        error: payload,
        sentToken: false,
      };
    },
    handleSentMail(state) {
      return {
        ...state,
        error: null,
        sentToken: true,
      };
    },
    handleResetState() {
      return {
        error: null,
        sentToken: false,
      };
    },
  },
};
