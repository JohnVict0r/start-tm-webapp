import { message } from 'antd';
import { formatMessage } from 'umi/locale';
import {
  loadCard,
  createCard,
  updateCard,
  moveCard,
  assignUser,
  unAssignUser,
  createFile,
  deleteFile,
  assignMilestone,
  unassignMilestone,
  assigneeUser,
  unAssigneeUser,
} from '@/services/cards';

export default {
  namespace: 'cards',

  state: {
    validation: null,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(loadCard, payload);

      if (!response.errors) {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });
      }
    },

    *save({ payload }, { call, put, select }) {
      const response = payload.id
        ? yield call(updateCard, payload)
        : yield call(createCard, payload);

      if (response.errors) {
        yield put({
          type: 'handleError',
          payload: response,
        });

        return yield select(state => state.cards.validation);
      }

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      message.success(
        formatMessage({
          id: payload.id ? 'app.card.sucess-updated' : 'app.card.sucess-created',
        })
      );

      return null;
    },

    *moveCard({ payload }, { call, put }) {
      const response = yield call(moveCard, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });
    },

    *assigin({ payload }, { call, put }) {
      const response = yield call(assignUser, payload);
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
      }
    },

    *assiginee({ payload }, { call, put }) {
      const response = yield call(assigneeUser, payload);
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
      }
    },

    *unAssiginee({ payload }, { call, put }) {
      const response = yield call(unAssigneeUser, payload);
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
      }
    },

    *updateMilestone({ payload }, { call, put }) {
      const response = payload.milestoneId
        ? yield call(assignMilestone, payload)
        : yield call(unassignMilestone, payload);
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
      }
    },

    *unAssigin({ payload }, { call, put }) {
      const response = yield call(unAssignUser, payload);
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
      }
    },

    *uploadFile({ payload }, { call, put }) {
      const response = yield call(createFile, payload);
      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      message.success('Arquivo anexado!');
    },

    *removeFile({ payload }, { call, put }) {
      const response = yield call(deleteFile, payload);
      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });
    },
  },

  reducers: {
    handleError(state, { payload }) {
      return {
        ...state,
        validation: payload,
      };
    },
  },
};
