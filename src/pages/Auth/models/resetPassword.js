import { routerRedux } from 'dva/router';
import { resetPassword } from '@/services/auth';
import { setAuthToken } from '@/utils/authentication';
import { reloadAuthenticated } from '@/utils/Authenticated';

export default {
  namespace: 'resetPassword',

  state: {
    error: null,
  },

  effects: {
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
