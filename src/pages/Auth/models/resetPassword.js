import { routerRedux } from 'dva/router';
import { resetPassword } from '@/services/auth';
import { setAuthToken } from '@/utils/authentication';

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

        yield put({
          type: 'global/fetchLoggedInUser'
        });

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
