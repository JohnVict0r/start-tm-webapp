import { queryUser } from '@/services/search';

export default {
  namespace: 'search',

  state: {
    users: [],
  },

  effects: {
    *searchUser({ payload }, { call, put }) {
      yield put({ type: 'clearUserQuery' });
      const response = yield call(queryUser, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'saveUsers',
        payload: response.result,
      });
    },
  },

  reducers: {
    clearUserQuery(state) {
      return {
        ...state,
        users: [],
      };
    },
    saveUsers(state, action) {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
};
