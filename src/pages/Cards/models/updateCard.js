import { message } from 'antd';
import { formatMessage } from 'umi/locale';
import { updateDueCard, updatePriorityCard } from '@/services/cards';

export default {
  namespace: 'updateCard',

  state: {
    validation: null,
  },

  effects: {
    *updateDue({ payload }, { call, put }) {
      const response = yield call(updateDueCard, payload);

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

        message.success(
          formatMessage({
            id: 'app.card.due.sucess-update',
          })
        );
      }
    },
    *updatePriority({ payload }, { call, put }) {
      const response = yield call(updatePriorityCard, payload);

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

        message.success(
          formatMessage({
            id: 'app.card.due.sucess-update',
          })
        );
      }
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
