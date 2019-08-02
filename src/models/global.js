import { queryNotices } from '@/services/api';
import { fetchRoles } from '@/services/auth';
import { loadStatus } from '@/services/global';
import { loadLoggedInUser, loadFavorites } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import Schema from '@/services/Schema';

export default {
  namespace: 'global',

  state: {
    roles: [],
    status: [],
    collapsed: false,
    notices: [],
    favorites: [],
    loggedInUser: null,
  },

  effects: {
    *fetchLoggedInUser(_, { call, put, select }) {
      const response = yield call(loadLoggedInUser);

      console.log(response);
      if (!response.errors) {
        // yield put({
        //   type: 'entities/mergeEntities',
        //   payload: response.entities,
        // });

        // yield put({
        //   type: 'saveLoggedInUser',
        //   payload: response.result,
        // });

        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data: response,
            schema: Schema.USER,
          },
        });

        console.log(result);

        const loggedInUserRoleIds = yield select(({ entities }) => entities.users[result].roles);

        const loggedInUserRoles = yield select(({ entities }) =>
          entities.roles.filter(i => loggedInUserRoleIds.include(i.id)).map(i => i.id)
        );

        console.log(loggedInUserRoles);

        setAuthority(loggedInUserRoleIds);
        reloadAuthorized();
      }
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

    *fetchStatus(_, { call, put }) {
      const response = yield call(loadStatus);
      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });
      yield put({
        type: 'saveStatus',
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
    *fetchFavorites(_, { call, put }) {
      const response = yield call(loadFavorites);
      yield put({
        type: 'saveFavorites',
        payload: response,
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
    saveStatus(state, { payload }) {
      return {
        ...state,
        status: payload,
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
    saveFavorites(state, { payload }) {
      return {
        ...state,
        favorites: payload,
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
