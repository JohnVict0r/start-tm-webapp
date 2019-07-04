import { createFederationClub } from '@/services/clubs';
import { message } from 'antd';
import Schema from '@/services/Schema';

export default {
  namespace: 'federationClubs',

  state: {},

  reducers: {},

  effects: {
    *create({ payload }, { call, put }) {
      try {
        const response = yield call(createFederationClub, payload);

        yield put({
          type: 'entities/normalize',
          payload: {
            data: response,
            schema: Schema.CLUB,
          },
        });

        message.success('Clube criado com sucesso!');
      } catch (e) {
        message.error('Não foi possível adicionar o membro!');
      }
    },
  },
};
