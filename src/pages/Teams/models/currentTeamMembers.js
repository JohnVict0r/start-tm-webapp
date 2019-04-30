import {
  loadTeamMembers,
  addTeamMember,
  deleteTeamMember,
  changeTeamMemberRole,
} from '@/services/teams';
import { message } from 'antd';

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
        message.error('Não foi possível Adicionar o membro!');
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        yield put({
          type: 'search/clearUserQuery'
        });

        message.success('Membro adicionado com sucesso!');
      }
    },

    *deleteMember({ payload }, { call, put }) {
      const response = yield call(deleteTeamMember, payload.id, payload.member);

      if (response.errors) {
        message.error('Não foi possível remover o membro!');
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        message.success('Membro removido com sucesso!');
      }
    },

    *changeMemberRole({ payload }, { call, put }) {
      const response = yield call(changeTeamMemberRole, payload);

      if (response.errors) {
        message.error('Não foi possível alterar o papel do membro!');
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        message.success('Papel do membro alterado com sucesso!');
      }
    },
  },

  reducers: {
    receiveItems(state, { payload }) {
      return payload;
    },
  },
};
