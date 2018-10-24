import { loadUserTeams, loadUserMasterOfTeams, loadTeam, createTeam } from '@/services/teams';

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
    masterOfTeams: [],
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

      yield put({
        type: 'receiveItem',
        payload: {
          item: response.result,
        },
      });
    },

    *fetchUserMasterOfTeams(_, { call, put }) {
      const response = yield call(loadUserMasterOfTeams);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveMasterOfTeams',
        payload: response.result,
      });
    },

    *createTeam({ payload }, { call, put }) {
      const response = yield call(createTeam, payload);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveItem',
        payload: {
          item: response.result,
        },
      });
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
    receiveItem(state, { payload }) {
      return {
        ...state,
        explore: {
          ...state.explore,
          items: [...state.explore.items, payload.item],
        },
      };
    },
    receiveMasterOfTeams(state, { payload }) {
      return {
        ...state,
        masterOfTeams: payload,
      };
    },
  },
};
