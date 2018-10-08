import merge from 'lodash/merge';

export default {
  namespace: 'entities',

  state: {
    teams: {},
    projects: {},
    //   users: {},
  },

  reducers: {
    mergeEntities(state, { payload }) {
      return merge({}, state, payload);
    },
  },
};
