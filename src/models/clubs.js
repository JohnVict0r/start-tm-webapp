import { message } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';
import Schema from '@/services/Schema';
import { loadClubsByFederationId, createClub, uploadClub, loadClub } from '@/services/clubs';
import { initialPaginationState } from '@/utils/getPaginationProps';

export default {
  namespace: 'clubs',

  state: {
    byFederationId: {},
    forCurrentUser: {
      clubsIds: [],
      meta: initialPaginationState,
    },
  },

  reducers: {
    handleError(state, { payload }) {
      return {
        ...state,
        error: payload,
      };
    },
    receiveClubsByFederationId(state, { payload }) {
      const { federation_id, clubsIds, meta } = payload;
      return {
        ...state,
        byFederationId: {
          ...state.byFederationId,
          [federation_id]: {
            clubsIds,
            meta,
          },
        },
      };
    },
  },

  effects: {
    *save({ payload }, { call, put }) {
      try {
        const response = payload.id
          ? yield call(uploadClub, payload)
          : yield call(createClub, payload);

        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data: response,
            schema: Schema.CLUB,
          },
        });

        payload.id
          ? message.success(formatMessage({ id: 'app.club.success-edited' }))
          : message.success(formatMessage({ id: 'app.club.success-created' }));

        router.push(`/clubs/${result}`);
      } catch (e) {
        payload.id
          ? message.error(formatMessage({ id: 'app.club.failed-edited' }))
          : message.error(formatMessage({ id: 'app.club.failed-created' }));
      }
    },

    *fetchClub({ payload }, { call, put }) {
      try {
        const response = yield call(loadClub, payload);

        // normaliza os dados retornados e
        // funde com o state.entities
        yield put({
          type: 'entities/normalize',
          payload: {
            data: response,
            schema: Schema.CLUB,
          },
        });
      } catch (e) {
        // Não faz nada
      }
    },

    *fetchByFederation({ payload }, { call, put }) {
      try {
        const response = yield call(loadClubsByFederationId, payload);

        const { data, ...meta } = response;

        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data,
            schema: Schema.CLUB_ARRAY,
          },
        });

        yield put({
          type: 'receiveClubsByFederationId',
          payload: {
            federation_id: payload.federation_id,
            clubsIds: result,
            meta,
          },
        });
      } catch (error) {
        // não faz nada
      }
    },
  },
};
