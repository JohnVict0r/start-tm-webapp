import {
  loadWorkflow,
  createWorkflowNode,
  createWorkflowTransition,
  deleteWorkflowNode,
} from '@/services/workflows';

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
  namespace: 'workflows',

  state: {
    explore: {
      items: [],
      pagination: initialPaginatioState,
    },
  },

  effects: {
    *fetchWorkflow({ payload }, { call, put }) {
      const response = yield call(loadWorkflow, payload);

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
    *addWorkflowNode({ payload }, { call, put }) {
      let { node } = payload;
      if (node.CanCreateCard) {
        node = {
          ...node,
          canCreateCard: 1,
        };
      }

      const response = yield call(createWorkflowNode, payload.id, node);

      console.log(payload);

      if (response.errors) {
        notification.error({ message: 'Não foi possível Adicionar a etapa!' });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        notification.success({ message: 'Etapa adicionada com sucesso!' });
      }
    },
    *addWorkflowTransition({ payload }, { call, put }) {
      const response = yield call(createWorkflowTransition, payload.id, payload.transition);

      if (response.errors) {
        notification.error({ message: 'Não foi possível Adicionar a Transição!' });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        notification.success({ message: 'Transição adicionada com sucesso!' });
      }
    },
    *deleteWorkflowNode({ payload }, { call, put }) {
      const response = yield call(deleteWorkflowNode, payload.id);

      if (response.errors) {
        notification.error({ message: 'Não foi possível deletar a etapa!' });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        notification.success({ message: 'Etapa deletada com sucesso!' });
      }
    },
  },

  reducers: {
    receiveItems(state, { payload }) {
      return {
        ...state,
        explore: {
          ...state.explore,
          items: payload.items,
          pagination: payload.pagination,
        },
      };
    },
    receiveItem(state, { payload }) {
      return {
        ...state,
        explore: {
          ...state.explore,
          items: [...state.explore.items, payload.item],
        },
      };
    },
  },
};
