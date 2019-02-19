import { loadUsers, removeUser, changeUserRole } from '@/services/admin';
import { notification } from 'antd';

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
    *fetchUsers(_, { call, put }) {
      const response = yield call(loadUsers);

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
        notification.error({ message: 'Não foi possível remover o usuário!' });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        notification.success({ message: 'Usuário removido com sucesso!' });
      }
    },
    *updateUserRole({ payload }, { call, put }) {
      const response = yield call(changeUserRole, payload);

      if (response.errors) {
        notification.error({ message: 'Não foi possível alterar o papel do usuário!' });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        notification.success({ message: 'Papel do usuário alterado com sucesso!' });
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
