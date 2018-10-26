import { queryNotices } from '@/services/api';
import { fetchRoles } from '@/services/auth';
import { loadLoggedInUser } from '@/services/user';

export default {
  namespace: 'global',

  state: {
    roles: [],
    collapsed: false,
    notices: [],
    loggedInUser: null,
  },

  effects: {
    *fetchLoggedInUser(_, { call, put }) {
      const response = yield call(loadLoggedInUser);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'saveLoggedInUser',
        payload: response.result,
      });
    },
    *fetchRoles(_, { call, put }) {
      const response = yield call(fetchRoles);
      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });
      yield put({
        type: 'saveRoles',
        payload: response.result,
      });
    },

    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length,
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
  },

  reducers: {
    saveLoggedInUser(state, { payload }) {
      return {
        ...state,
        loggedInUser: payload,
      };
    },
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveRoles(state, { payload }) {
      return {
        ...state,
        roles: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
