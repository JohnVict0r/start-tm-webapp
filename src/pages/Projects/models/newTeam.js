import { message } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';
import { createTeam } from '@/services/teams';
import Schema from '@/services/Schema';

export default {
  namespace: 'newTeam',

  state: {},

  effects: {
    *create({ payload }, { call, put }) {
      try {
        const response = yield call(createTeam, payload);

        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data: response.data,
            schema: Schema.TEAM
          }
        });

        message.success(formatMessage({ id: 'app.team.success-created' }));
        router.push(`/teams/${result}`);

      } catch (error) {
        // erro de validação nos dados
        yield put({
          type: 'validation/handleError',
          payload: { effect: 'newTeam/create', error },
        });
      }
    },
  },

  reducers: {},
};
