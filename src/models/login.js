import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login, loginWithSabia } from '@/services/auth';
import { setAuthToken, removeAuthToken } from '@/utils/authentication';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthenticated } from '@/utils/Authenticated';
import { removeAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    isLoggedIn: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);

      yield put({
        type: 'authenticate',
        payload: response,
      });
    },

    *loginWithSabia({ payload }, { call, put }) {
      const response = yield call(loginWithSabia, payload);

      yield put({
        type: 'authenticate',
        payload: response,
      });
    },

    *authenticate({ payload }, { put }) {

      const isLoggedIn = !!payload && !!payload.token;

      yield put({
        type: 'changeLoginStatus',
        payload: isLoggedIn,
      });

      // Login successfully
      if (isLoggedIn) {
        setAuthToken(payload.token);
        reloadAuthenticated();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
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
      removeAuthority();
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/auth/login',
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
