import { loadProjectMembers, addProjectMember, deleteProjectMember } from '@/services/projects';

export default {
  namespace: 'currentProjectMembers',

  state: [],

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(loadProjectMembers, payload);

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
      const response = yield call(addProjectMember, payload.id, payload.member);
      
      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveItems',
        payload: response.result,
      });
    },

    *deleteMember({ payload }, { call, put }) {
      const response = yield call(deleteProjectMember, payload.id, payload.member);

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
