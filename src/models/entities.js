import merge from 'lodash/merge';

export default {
  namespace: 'entities',

  state: {
    teams: {},
    users: {},
  },

  // effects: {
  //   *fetchNotices(_, { call, put }) {
  //     const data = yield call(queryNotices);
  //     yield put({
  //       type: 'saveNotices',
  //       payload: data,
  //     });
  //     yield put({
  //       type: 'user/changeNotifyCount',
  //       payload: data.length,
  //     });
  //   },
  //   *clearNotices({ payload }, { put, select }) {
  //     yield put({
  //       type: 'saveClearedNotices',
  //       payload,
  //     });
  //     const count = yield select(state => state.global.notices.length);
  //     yield put({
  //       type: 'user/changeNotifyCount',
  //       payload: count,
  //     });
  //   },
  // },

  reducers: {
    mergeEntities(state, { payload }) {
      return merge({}, state, payload);
    },
  },
};
