import has from 'lodash/has';
import merge from 'lodash/merge';
import assign from 'lodash/assign';
import { normalize } from 'normalizr';

const updateEntites = ({ state, payload }) => ({ entity, updateStrategy = merge }) =>
  has(payload, entity)
    ? {
        [entity]: updateStrategy({}, state[entity], payload[entity]),
      }
    : {};

export default {
  namespace: 'entities',

  state: {
    status: {},
    roles: {},
    users: {},
    teds: {},
    goals: {},
    projects: {},
    teams: {},
    boards: {},
    milestones: {},
    cardlists: {},
    cards: {},
    comments: {},
  },

  reducers: {
    mergeEntities(state, { payload }) {
      const updater = updateEntites({ state, payload });

      return {
        ...state,
        ...updater({ entity: 'status' }),
        ...updater({ entity: 'roles' }),
        ...updater({ entity: 'users' }),
        ...updater({ entity: 'teds' }),
        ...updater({ entity: 'goals' }),
        ...updater({ entity: 'projects' }),
        ...updater({ entity: 'teams' }),
        ...updater({ entity: 'boards', updateStrategy: assign }),
        ...updater({ entity: 'milestones' }),
        ...updater({ entity: 'cardlists', updateStrategy: assign }),
        ...updater({ entity: 'cards', updateStrategy: assign }),
        ...updater({ entity: 'comments' }),
      };
    },
  },

  effects: {
    *normalize({ payload: { data, schema }}, { call, put }) {
      const normalized = yield call(normalize, data, schema);

      yield put({
        type: 'mergeEntities',
        payload: normalized.entities,
      });

      return normalized.result;
    }
  }
};
