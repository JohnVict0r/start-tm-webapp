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
    // starttm
    clubs: {},
    events: {},
    federations: {},
    championships: {},
    tables: {},
    address: {},
  },

  reducers: {
    mergeEntities(state, { payload }) {
      const updater = updateEntites({ state, payload });

      return {
        ...state,
        ...updater({ entity: 'status' }),
        ...updater({ entity: 'roles' }),
        ...updater({ entity: 'users' }),
        ...updater({ entity: 'address' }),
        ...updater({ entity: 'clubs' }),
        ...updater({ entity: 'events', updateStrategy: assign }),
        ...updater({ entity: 'federations' }),
        ...updater({ entity: 'tables' }),
      };
    },
  },

  effects: {
    *normalize({ payload: { data, schema } }, { call, put }) {
      const normalized = yield call(normalize, data, schema);

      yield put({
        type: 'mergeEntities',
        payload: normalized.entities,
      });

      return normalized.result;
    },
  },
};
