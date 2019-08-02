import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login, loginWithSabia } from '@/services/auth';
import { setAuthToken, removeAuthToken } from '@/utils/authentication';
import { getPageQuery } from '@/utils/utils';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    isLoggedIn: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);

      // simulando resposta do backend
      // const response = {
      //   token:
      //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU1OTEzMDQ3MiwiZXhwIjoxNTYxNzIyNDcyLCJuYmYiOjE1NTkxMzA0NzIsImp0aSI6IjBpNU8za3IzcjN3YVBKOXYiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.RMfXKFHFIUTUmQaCGLoqjzLv4C5Q7cbbJ-wI9ea0-SE',
      //   expiresIn: 2592000,
      // };

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

        yield put.resolve({
          type: 'global/fetchLoggedInUser',
        });

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
            redirect = null;
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
      setAuthority('');
      reloadAuthorized();
      const { redirect } = getPageQuery();
      // redirect
      if (window.location.pathname !== '/auth/login' && !redirect) {
        yield put(
          routerRedux.push({
            pathname: '/auth/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
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
