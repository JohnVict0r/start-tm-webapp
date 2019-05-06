import { routerRedux } from 'dva/router';
import { signup } from '@/services/auth';
import { setAuthToken } from '@/utils/authentication';

export default {
  namespace: 'register',

  state: {
    error: null,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(signup, payload);

      // Login successfully
      if (response.token) {
        setAuthToken(response.token);

        yield put({
          type: 'global/fetchLoggedInUser'
        });

        yield put(routerRedux.replace('/'));
      }

      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        error: payload,
      };
    },
  },
};
