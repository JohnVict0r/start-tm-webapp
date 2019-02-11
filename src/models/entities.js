import has from 'lodash/has';
import merge from 'lodash/merge';
import assign from 'lodash/assign';

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
    teams: {},
    projects: {},
    boards: {},
    cardlists: {},
    cards: {},
    comments: {},
    workflows: {},
    workflowNodes: {},
    workflowTransitions: {},
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
        ...updater({ entity: 'teams' }),
        ...updater({ entity: 'projects' }),
        ...updater({ entity: 'boards', updateStrategy: assign }),
        ...updater({ entity: 'cardlists', updateStrategy: assign }),
        ...updater({ entity: 'cards' }),
        ...updater({ entity: 'comments' }),
        ...updater({ entity: 'workflows' }),
        ...updater({ entity: 'workflowNodes' }),
        ...updater({ entity: 'workflowTransitions' }),
      };
    },
  },
};
