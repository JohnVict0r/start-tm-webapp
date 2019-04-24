import {
  loadBoard,
  createCardList,
  updateCardList,
  reorderCardLists,
  updateTransition,
} from '@/services/boards';

import { message } from 'antd';

export default {
  namespace: 'boards',

  state: {
    currentBoard: null,
    validation: null,
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
      const response = payload.id
        ? yield call(updateCardList, payload)
        : yield call(createCardList, payload);

      if (response.errors) {
        yield put({
          type: 'handleError',
          payload: response,
        });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        message.success('Lista adicionada com sucesso!');
      }
    },

    *toggleTransition({ payload }, { call, put }) {
      const response = yield call(updateTransition, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });
    },

    *moveCardlist({ payload }, { call, put }) {
      const response = yield call(reorderCardLists, payload);

      if (response.errors) {
        message.error('Não foi possível mover a lista!');
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        message.success('Lista movida com sucesso!');
      }
    },
  },

  reducers: {
    receiveBoard(state, { payload }) {
      return {
        ...state,
        currentBoard: payload,
      };
    },
    handleError(state, { payload }) {
      return {
        ...state,
        validation: payload,
      };
    },
  },
};
