import { uploadAddress } from '@/services/address';

import Schema from '@/services/Schema';

export default {
  namespace: 'address',

  state: {},

  reducers: {},

  effects: {
    *save({ payload }, { call, put }) {
      try {
        const response = yield call(uploadAddress, payload);

        // normaliza os dados retornados e
        // funde com o state.entities
        yield put({
          type: 'entities/normalize',
          payload: {
            data: response,
            schema: Schema.ADDRESS,
          },
        });
      } catch (e) {
        // não faz nada
      }
    },
  },
};
