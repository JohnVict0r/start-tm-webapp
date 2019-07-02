import {
  loadUserTeams,
  loadTeam,
  loadTeamsByProjectId,
  updateTeam,
  createTeam,
} from '@/services/teams';
import { message } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';
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
  namespace: 'teams',

  state: {
    error: null,
    currentBoard: null,
    byProjectId: {},
    forCurrentUser: {
      teamIds: [],
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
    receiveTeamsByProjectId(state, { payload }) {
      const { projectId, teamIds, meta } = payload;
      return {
        ...state,
        byProjectId: {
          ...state.byProjectId,
          [projectId]: {
            teamIds,
            meta,
          },
        },
      };
    },
  },

  effects: {
    *fetchUserTeams({ payload }, { call, put }) {
      try {
        const response = yield call(loadUserTeams, payload);

        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data: response.data,
            schema: Schema.TEAM_ARRAY,
          },
        });

        yield put({
          type: 'receiveTeamsForCurrentUser',
          payload: {
            teamIds: result,
            meta: response.meta,
          },
        });
      } catch (error) {
        // não faz nada
      }
    },

    *fetchTeam({ payload }, { call, put }) {
      try {
        const response = yield call(loadTeam, payload);

        // normaliza os dados retornados e
        // funde com o state.entities
        yield put({
          type: 'entities/normalize',
          payload: {
            data: response.data,
            schema: Schema.TEAM,
          },
        });
      } catch (error) {
        // não faz nada
      }
    },

    *save({ payload }, { call, put }) {
      try {
        const response = payload.id
          ? yield call(updateTeam, payload)
          : yield call(createTeam, payload);

        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data: response.data,
            schema: Schema.TEAM,
          },
        });

        message.success(
          formatMessage({ id: payload.id ? 'app.team.success-edited' : 'app.team.success-created' })
        );
        router.push(`/teams/${result}`);
      } catch (error) {
        // erro de validação nos dados
        yield put({
          type: 'validation/handleError',
          payload: { effect: 'teams/save', error },
        });
      }
    },

    *fetchByProject({ payload }, { call, put }) {
      try {
        const response = yield call(loadTeamsByProjectId, payload);

        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data: response.data,
            schema: Schema.TEAM_ARRAY,
          },
        });

        yield put({
          type: 'receiveTeamsByProjectId',
          payload: {
            projectId: payload.projectId,
            teamIds: result,
            meta: response.meta,
          },
        });
      } catch (error) {
        // não faz nada
      }
    },
  },
};
