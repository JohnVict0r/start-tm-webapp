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
    goals: {},
    projects: {},
    teams: {},
    boards: {},
    milestones: {},
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
        ...updater({ entity: 'goals' }),
        ...updater({ entity: 'projects' }),
        ...updater({ entity: 'teams' }),
        ...updater({ entity: 'boards', updateStrategy: assign }),
        ...updater({ entity: 'milestones' }),
        ...updater({ entity: 'cardlists', updateStrategy: assign }),
        ...updater({ entity: 'cards', updateStrategy: assign }),
        ...updater({ entity: 'comments' }),
        ...updater({ entity: 'workflows', updateStrategy: assign }),
        ...updater({ entity: 'workflowNodes' }),
        ...updater({ entity: 'workflowTransitions' }),
      };
    },
  },
};
