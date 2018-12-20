import {
  loadProjectMembers,
  addProjectMember,
  deleteProjectMember,
  changeProjectMemberRole,
} from '@/services/projects';
import { notification } from 'antd';

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
      const response = yield call(deleteProjectMember, payload.id, payload.member);

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

    *changeMemberRole({ payload }, { call, put }) {
      const response = yield call(changeProjectMemberRole, payload);

      if (response.errors) {
        notification.error({ message: 'Não foi possível alterar o papel do membro!' });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        notification.success({ message: 'Papel do membro alterado com sucesso!' });
      }
    },
  },

  reducers: {
    receiveItems(state, { payload }) {
      return payload;
    },
  },
};
