import { createTeam, updateTeam } from '@/services/teams';
import router from 'umi/router';
import { notification } from 'antd';
import { formatMessage } from 'umi/locale';

export default {
  namespace: 'saveTeam',

  state: {
    error: null,
  },

  effects: {
    *save({ payload }, { call, put }) {
      const response = payload.id
        ? yield call(updateTeam, payload)
        : yield call(createTeam, payload.values);

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
        notification.success({
          message: formatMessage({
            id: payload.id ? 'app.team.sucess-updated' : 'app.team.sucess-created',
          }),
        });
        router.push(`/teams/${response.result}`);
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
