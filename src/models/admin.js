import { loadUsers, removeUser, changeUserRole } from '@/services/admin';
import { message } from 'antd';
import { router } from 'umi';

const initialPaginatioState = {
  count: 0,
  currentPage: 0,
  links: [],
  perPage: 0,
  total: 0,
  totalPages: 0,
};

export default {
  namespace: 'admin',
  state: {
    users: {
      items: [],
      pagination: initialPaginatioState,
    },
  },

  effects: {
    *fetchUsers({ payload }, { call, put }) {
      const response = yield call(loadUsers, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveItems',
        payload: {
          items: response.result,
          pagination: response.pagination,
        },
      });
    },
    *deleteUser({ payload }, { call, put }) {
      const response = yield call(removeUser, payload);

      if (response.errors) {
        message.error('Não foi possível remover o usuário!');
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        message.success('Usuário removido com sucesso!');
      }
    },
    *updateUserRole({ payload }, { call, put }) {
      const response = yield call(changeUserRole, payload);

      if (response.errors) {
        message.error('Não foi possível alterar o papel do usuário!');
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });
        message.success('Papel do usuário alterado com sucesso!');
        router.push('/admin/users');
      }
    },
  },

  reducers: {
    receiveItems(state, { payload }) {
      return {
        ...state,
        users: {
          ...state.users,
          items: payload.items,
          pagination: payload.pagination,
        },
      };
    },
  },
};
