import { loadTeamMembers, addTeamMember, deleteTeamMember } from '@/services/teams';

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

    *deleteMember({ payload }, { call }) {
      // const response = yield call(deleteTeamMember, payload.id, payload.member);

      // nao possui resposta para usar yield put
      yield call(
        deleteTeamMember, 
        payload.id, 
        payload.member
      );      

    }
  },

  reducers: {
    receiveItems(state, { payload }) {
      return payload;
    },
  },
};
