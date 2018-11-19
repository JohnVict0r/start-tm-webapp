import {
  query as queryUsers,
  queryCurrent,
  updateLoggedInUserInfo,
  updateLoggedInUserPassword,
} from '@/services/user';
import { formatMessage } from 'umi/locale';
import { notification } from 'antd';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    updatePassword: {
      error: null,
    },
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *updateUserInfo({ payload }, { call, put }) {
      const response = yield call(updateLoggedInUserInfo, payload);
      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });
      notification.success({ message: formatMessage({ id: 'form.namechange.sucess' }) });
    },
    *updateUserPassword({ payload }, { call, put }) {
      const response = yield call(updateLoggedInUserPassword, payload);
      if (response.errors) {
        yield put({
          type: 'handlePasswordUpdateError',
          payload: response,
        });
      } else {
        notification.success({ message: formatMessage({ id: 'form.passwordchange.sucess' }) });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    handlePasswordUpdateError(state, { payload }) {
      return {
        ...state,
        updatePassword: {
          ...state.updatePassword,
          error: payload,
        },
      };
    },
  },
};
