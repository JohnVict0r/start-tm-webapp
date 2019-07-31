import { loadClubsByFederationId, createClub, uploadClub, loadClub } from '@/services/clubs';
import { message } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';
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
  namespace: 'clubs',

  state: {
    byFederationId: {},
    forCurrentUser: {
      clubsIds: [],
      meta: initialPaginatioState,
    },
  },

  reducers: {
    handleError(state, { payload }) {
      return {
        ...state,
        error: payload,
      };
    },
    receiveTeamsForCurrentUser(state, { payload }) {
      return {
        ...state,
        forCurrentUser: {
          ...state.forCurrentUser,
          teamIds: payload.teamIds,
          meta: payload.meta,
        },
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
          ? message.success(formatMessage({ id: 'app.club.failed-edited' }))
          : message.success(formatMessage({ id: 'app.club.failed-created' }));
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

        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data: response.data,
            schema: Schema.CLUB_ARRAY,
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
