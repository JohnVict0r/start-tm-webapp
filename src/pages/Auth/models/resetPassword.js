import { resetPassword } from '@/services/auth';

export default {
  namespace: 'resetPassword',

  state: {
    error: null,
  },

  effects: {
    *resetPasswordWithToken({ payload }, { call, put }) {
      const response = yield call(resetPassword, payload);

      if (response.token) {
        yield put({
          type: 'login/authenticate',
          payload: response,
        });
      }
      yield put({
        type: 'handleForgotPasswordError',
        payload: response,
      });
    },
  },

  reducers: {
    handleForgotPasswordError(state, { payload }) {
      return {
        ...state,
        error: payload,
      };
    },
  },
};
