import { loadTeamMembers, addTeamMember } from '@/services/teams';

export default {
  namespace: 'currentTeamMembers',

  state: [],

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(loadTeamMembers, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveItems',
        payload: response.result,
      });
    },

    *addMember({ payload }, { call, put }) {
      const response = yield call(addTeamMember, payload.id, payload.member);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveItems',
        payload: response.result,
      });
    },
  },

  reducers: {
    receiveItems(state, { payload }) {
      return payload;
    },
  },
};
