import { loadClubsByFederationId, createClub, loadClub } from '@/services/clubs';
import { message } from 'antd';
import router from 'umi/router';
// import { formatMessage } from 'umi/locale';
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
    // *save({ payload }, { call, put }) {
    //   try {
    //     const response = payload.id
    //       ? yield call(updateTeam, payload)
    //       : yield call(createTeam, payload);

    //     // normaliza os dados retornados e
    //     // funde com o state.entities
    //     const result = yield put.resolve({
    //       type: 'entities/normalize',
    //       payload: {
    //         data: response.data,
    //         schema: Schema.TEAM,
    //       },
    //     });

    //     message.success(
    //       formatMessage({ id: payload.id ? 'app.team.success-edited' : 'app.team.success-created' })
    //     );
    //     router.push(`/teams/${result}`);
    //   } catch (error) {
    //     // erro de validação nos dados
    //     yield put({
    //       type: 'validation/handleError',
    //       payload: { effect: 'teams/save', error },
    //     });
    //   }
    // },
    *save({ payload }, { call, put }) {
      try {
        const response = yield call(createClub, payload);
        
        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data: response,
            schema: Schema.CLUB,
          },
        });

        message.success('Clube criado com sucesso!');
        router.push(`/clubs/${result}`);

      } catch (e) {
        message.error('Não foi possível criar o clube!');
      }
    },

    *fetchClub({ payload }, { call, put }) {
      try {
        const response = yield call(loadClub, payload);
        
        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
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
