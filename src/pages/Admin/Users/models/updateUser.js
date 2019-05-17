import { loadUser } from '@/services/admin';

export default {
  namespace: 'updateUser',

  state: {
    error: null,
    item: {},
  },

  effects: {
    *fetchUser({ payload }, { call, put }) {
      const response = yield call(loadUser, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveItem',
        payload: {
          item: response.result,
        },
      });
    },
  },

  reducers: {
    receiveItem(state, { payload }) {
      return {
        ...state,
        item: payload.item,
      };
    },
  },
};
