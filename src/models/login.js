import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login } from '@/services/auth';
import { setAuthToken, removeAuthToken } from '@/utils/authentication';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthenticated } from '@/utils/Authenticated';

export default {
  namespace: 'login',

  state: {
    isLoggedIn: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);

      const isLoggedIn = !!response && !!response.token;

      yield put({
        type: 'changeLoginStatus',
        payload: isLoggedIn,
      });

      // Login successfully
      if (isLoggedIn) {
        setAuthToken(response.token);
        reloadAuthenticated();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: undefined,
      });
      removeAuthToken();
      reloadAuthenticated();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        isLoggedIn: payload,
      };
    },
  },
};
