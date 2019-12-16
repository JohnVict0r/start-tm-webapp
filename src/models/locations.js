import { loadCities, loadStates } from '@/services/locations';

export default {
  namespace: 'locations',

  state: {
    states: [],
    citiesByStateId: {},
  },

  reducers: {
    receiveStates(state, { payload }) {
      return {
        ...state,
        states: payload,
      };
    },
    receiveCitiesByStateId(state, { payload }) {
      const { state_id, cities } = payload;
      return {
        ...state,
        citiesByStateId: {
          ...state.citiesByStateId,
          [state_id]: {
            cities,
          },
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

    *fetchCititesByStateId({ payload }, { call, put }) {
      try {
        const response = yield call(loadCities, payload);
        yield put({
          type: 'receiveCitiesByStateId',
          payload: {
            state_id: payload.state_id,
            cities: response,
          },
        });
      } catch (e) {
        // não faz nada
      }
    },
  },
};
