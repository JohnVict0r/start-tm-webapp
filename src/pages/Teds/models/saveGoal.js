import { createGoal } from '@/services/goals';
import router from 'umi/router';
import { message } from 'antd';

export default {
  namespace: 'saveGoal',

  state: {
    error: null,
  },

  effects: {
    *save({ payload }, { call, put }) {
      // const response = payload.id
      //   ? yield call(updateTed, payload)
      //   : yield call(createTed, payload.values);
      const response = yield call(createGoal, payload);

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
        message.success('Meta criada com sucesso!');
        router.push(`/teds/${payload.tedId}`);
      }
    },
  },

  reducers: {
    handleError(state, { payload }) {
      return {
        ...state,
        error: payload,
      };
    },
  },
};
