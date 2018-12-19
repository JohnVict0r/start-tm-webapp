import { loadTeamMembers, addTeamMember, deleteTeamMember } from '@/services/teams';
import { notification } from 'antd';

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

      if (response.errors) {
        notification.error({ message: 'Não foi possível Adicionar o membro!' });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        notification.success({ message: 'Membro adicionado com sucesso!' });
      }
    },

    *deleteMember({ payload }, { call, put }) {
      const response = yield call(deleteTeamMember, payload.id, payload.member);

      if (response.errors) {
        notification.error({ message: 'Não foi possível remover o membro!' });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        notification.success({ message: 'Membro removido com sucesso!' });
      }
    },
  },

  reducers: {
    receiveItems(state, { payload }) {
      return payload;
    },
  },
};
