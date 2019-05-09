import { signup } from '@/services/auth';

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
        yield put({
          type: 'login/authenticate',
          payload: response,
        });
      } else {
        yield put({
          type: 'registerHandle',
          payload: response,
        });
      }
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
