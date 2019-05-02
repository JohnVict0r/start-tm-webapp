import { message } from 'antd';
import router from 'umi/router';
import { createTeam } from '@/services/teams';
import { formatMessage } from 'umi/locale';

export default {
  namespace: 'createTeam',

  state: {
    validation: null,
  },

  effects: {
    *create({ payload }, { call, put }) {
      const response = yield call(createTeam, payload);

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

        message.success(formatMessage({ id: 'app.team.success-created' }));

        router.push(`/teams/${response.result}`);
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
