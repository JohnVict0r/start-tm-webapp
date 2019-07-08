import { message } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';
import { createFederation, uploadFederation, loadFederation, loadFederations } from '@/services/federations';
import Schema from '@/services/Schema';

const initialPaginatioState = {
  count: 0,
  page: 0,
  links: [],
  perPage: 0,
  total: 0,
  totalPages: 0,
};

export default {
  namespace: 'federations',

  state: {
    forCurrentUser: {
      federationIds: [],
      meta: initialPaginatioState,
    },
  },

  reducers: {
    receiveFederationsForCurrentUser(state, { payload }) {
      return {
        ...state,
        forCurrentUser: {
          ...state.forCurrentUser,
          federationIds: payload.federationIds,
          meta: payload.meta,
        },
      };
    },
  },

  effects: {
    *save({ payload }, { call, put }) {
      try {
        const response = payload.id
        ? yield call(uploadFederation, payload)
        : yield call(createFederation, payload);

        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data: response,
            schema: Schema.FEDERATION,
          },
        });

        payload.id 
        ? message.success(formatMessage({ id: 'app.federation.success-edited' }))
        : message.success(formatMessage({ id: 'app.federation.success-created' }));

        router.push(`/federations/${result}`);
      } catch (error) {
        // erro de validação nos dados
        yield put({
          type: 'validation/handleError',
          payload: { effect: 'federations/save', error },
        });
      }
    },

    *fetchFederation({ payload }, { call, put }) {
      try {
        const response = yield call(loadFederation, payload);

        // normaliza os dados retornados e
        // funde com o state.entities
        yield put({
          type: 'entities/normalize',
          payload: {
            data: response,
            schema: Schema.FEDERATION,
          },
        });
      } catch (error) {
        // não faz nada
      }
    },

    *fetchFederations({ payload }, { call, put }) {
      try {
        const response = yield call(loadFederations, payload);

        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data: response.data,
            schema: Schema.FEDERATION_ARRAY,
          },
        });

        const { page, perPage, total, lastPage } = response;
        const meta = {
          page,
          perPage,
          total,
          lastPage,
        };

        yield put({
          type: 'receiveFederationsForCurrentUser',
          payload: {
            federationIds: result,
            meta,
          },
        });
      } catch (error) {
        // não faz nada
      }
    },
  },
};
