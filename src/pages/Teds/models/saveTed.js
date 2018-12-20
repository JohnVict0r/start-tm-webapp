import { createTed } from '@/services/teds';
import router from 'umi/router';
import { message } from 'antd';

export default {
  namespace: 'saveTed',

  state: {
    error: null,
  },

  effects: {
    *save({ payload }, { call, put }) {
      // const response = payload.id
      //   ? yield call(updateTed, payload)
      //   : yield call(createTed, payload.values);
      const response = yield call(createTed, payload.values);

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
        message.success('TED criada com sucesso!');
        router.push(`/teds/${response.result}`);
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
