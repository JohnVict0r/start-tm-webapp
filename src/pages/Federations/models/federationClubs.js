import { createClub } from '@/services/clubs';
import { message } from 'antd';
import Schema from '@/services/Schema';

export default {
  namespace: 'federationClubs',

  state: {},

  reducers: {},

  effects: {
    *save({ payload }, { call, put }) {
      try {
        console.log('chegou')
        const response = yield call(createClub, payload);
        console.log(response)
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
