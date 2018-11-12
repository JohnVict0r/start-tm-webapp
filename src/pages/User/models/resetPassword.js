import { routerRedux } from 'dva/router';
import { forgotPassword, resetPassword } from '@/services/auth';
import { setAuthToken } from '@/utils/authentication';
import { reloadAuthenticated } from '@/utils/Authenticated';

export default {
  namespace: 'resetPassword',

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
    *resetPasswordWithToken({ payload }, { call, put }) {
      const response = yield call(resetPassword, payload);

      if (response.token) {
        setAuthToken(response.token);
        reloadAuthenticated();
        yield put(routerRedux.replace('/'));
      }
      yield put({
        type: 'handleForgotPasswordError',
        payload: response,
      });
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
