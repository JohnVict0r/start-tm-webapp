import { loadClubsByFederationId } from '@/services/clubs';
// import { message } from 'antd';
// import router from 'umi/router';
// import { formatMessage } from 'umi/locale';
import Schema from '@/services/Schema';

const initialPaginatioState = {
  count: 0,
  currentPage: 0,
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
      const { federationId, clubsIds, meta } = payload;
      return {
        ...state,
        byFederationId: {
          ...state.byFederationId,
          [federationId]: {
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
          type: 'receiveClubsByfederationId',
          payload: {
            federationId: payload.federationId,
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
