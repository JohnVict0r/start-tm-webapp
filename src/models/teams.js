import { loadTeam, updateTeam } from '@/services/teams';
import { message } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';

export default {
  namespace: 'teams',

  state: {
    currentBoard: null,
    error: null,
  },

  effects: {
    *fetchTeam({ payload }, { call, put }) {
      const response = yield call(loadTeam, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });
    },

    *update({ payload }, { call, put }) {
      const response = yield call(updateTeam, payload);

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

        message.success(formatMessage({ id: 'app.team.success-edited' }));

        router.push(`/teams/${payload.id}`);
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
