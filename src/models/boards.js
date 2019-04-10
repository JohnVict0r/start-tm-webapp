import {
  updateWorkflowNode,
  createWorkflowTransition,
  deleteWorkflowNode,
  deleteWorkflowTransition,
  reorderWorkflowNodes,
} from '@/services/workflows';
import {
  loadBoard,
  createCardList,
} from '@/services/boards';

import { notification, message } from 'antd';

const initialPaginatioState = {
  count: 0,
  currentPage: 0,
  links: [],
  perPage: 0,
  total: 0,
  totalPages: 0,
};

export default {
  namespace: 'boards',

  state: {
    currentBoard: null,
    explore: {
      items: [],
      pagination: initialPaginatioState,
    },
    workflows: {
      items: [],
      pagination: initialPaginatioState,
    },
  },

  effects: {
    *fetchBoard({ payload }, { call, put }) {
      const response = yield call(loadBoard, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveBoard',
        payload: response.result,
      });
    },

    *saveCardList({ payload }, { call, put }) {
      const response = yield call(createCardList, payload);

      if (response.errors) {
        notification.error({ message: 'Não foi possível adicionar lista!' });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        notification.success({ message: 'Lista adicionada com sucesso!' });
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

    *putWorkflowNode({ payload }, { call, put }) {
      const response = yield call(updateWorkflowNode, payload.id, payload.node);

      if (response.errors) {
        notification.error({ message: 'Não foi possível Atualizar a etapa!' });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        notification.success({ message: 'Etapa atualizada com sucesso!' });
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

    *deleteWorkflowTransition({ payload }, { call, put }) {
      const response = yield call(deleteWorkflowTransition, payload.id);

      if (response.errors) {
        notification.error({ message: 'Não foi possível deletar a transição!' });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        notification.success({ message: 'Transição deletada com sucesso!' });
      }
    },

    *moveWorkflowNode({ payload }, { call, put }) {
      const response = yield call(reorderWorkflowNodes, payload);

      if (response.errors) {
        notification.error({ message: 'Não foi possível mover a etapa!' });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItems',
          payload: response.result,
        });

        message.success('Etapa movida com sucesso!');
      }
    },
  },

  reducers: {
    receiveBoard(state, { payload }) {
      return {
        ...state,
        currentBoard: payload
      };
    },
    receiveWorkflows(state, { payload }) {
      return {
        ...state,
        workflows: {
          ...state.workflows,
          items: payload.items,
          pagination: payload.pagination,
        },
      };
    },
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
