import { loadTeam } from '@/services/teams';

export default {
  namespace: 'teams',

  state: {
    currentBoard: null,
  },

  effects: {
    *fetchTeam({ payload }, { call, put }) {
      const response = yield call(loadTeam, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });
    },
  },

  reducers: {},
};
