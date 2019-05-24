import { camelizeKeys } from 'humps';

/**
 * Model que armazena a validação dos formulários.
 */
export default {
  namespace: 'validation',

  state: {},

  reducers: {
    saveError(state, { payload }) {
      return {
        ...state,
        [payload.effect]: {
          ...state[payload.effect],
          ...payload.error,
        },
      };
    },
  },

  effects: {
    *handleError({ payload }, { put }) {
      const { error } = payload;
      if (error.response && error.response.status === 422) {
        try {
          const response = yield error.response.json();
          const camelizeError = camelizeKeys(response);

          yield put({
            type: 'saveError',
            payload: {
              effect: payload.effect,
              error: camelizeError,
            },
          });
        } catch (e) {
          // não faz nada mesmo
        }
      }
    },
  },
};
