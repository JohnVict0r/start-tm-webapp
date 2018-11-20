import { queryNotices } from '@/services/api';
import { fetchRoles } from '@/services/auth';
import { loadLoggedInUser, constructUserScehma } from '@/services/user';

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
    *fetchLoggedInUserAvatar({ payload }, { call, put }) {
      const response = yield call(constructUserScehma, payload);
      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
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

    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        })
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
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
