import { loadCities, loadStates } from '@/services/locations';

export default {
  namespace: 'locations',

  state: {
    states: [],
    citiesByUF: {},
  },

  reducers: {
    receiveStates(state, { payload }) {
      return {
        ...state,
        states: payload,
      };
    },
    receivecitiesByUF(state, { payload }) {
      const { uf, cities } = payload;
      return {
        ...state,
        citiesByUF: {
          ...state.citiesByUF,
          [uf]: cities,
        },
      };
    },
  },

  effects: {
    *fetchStates(_, { call, put }) {
      try {
        const response = yield call(loadStates);
        yield put({
          type: 'receiveStates',
          payload: response,
        });
      } catch (e) {
        // não faz nada
      }
    },

    *fetchcitiesByUF({ payload }, { call, put }) {
      try {
        const response = yield call(loadCities, payload);
        yield put({
          type: 'receivecitiesByUF',
          payload: {
            uf: payload.uf,
            cities: response,
          },
        });
      } catch (e) {
        // não faz nada
      }
    },
  },
};
