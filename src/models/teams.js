import { loadUserTeams, loadTeam, updateTeam } from '@/services/teams';
import { message } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';

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
    explore: {
      items: [],
      pagination: initialPaginatioState,
    },
  },

  effects: {
    *fetchUserTeams({ payload }, { call, put }) {
      const response = yield call(loadUserTeams, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveItems',
        payload: {
          items: response.result,
          pagination: response.pagination,
        },
      });
    },

    *fetchTeam({ payload }, { call, put }) {
      const response = yield call(loadTeam, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });
    },

    *update({ payload }, { call, put }) {
      const response = yield call(updateTeam, payload);

      if (response.errors) {
        yield put({
          type: 'handleError',
          payload: response,
        });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        message.success(formatMessage({ id: 'app.team.success-edited' }));

        router.push(`/teams/${payload.id}`);
      }
    },
  },

  reducers: {
    receiveItems(state, { payload }) {
      return {
        ...state,
        explore: {
          ...state.explore,
          items: payload.items,
          pagination: payload.pagination,
        },
      };
    },
    handleError(state, { payload }) {
      return {
        ...state,
        error: payload,
      };
    },
  },
};
