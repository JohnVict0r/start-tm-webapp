import { message } from 'antd';
import router from 'umi/router';
import { createTeam } from '@/services/teams';

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

        message.success('Equipe criada com sucesso!');

        // TODO não está indo para a rota
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
