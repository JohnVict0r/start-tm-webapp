import { loadFederationClubs, createFederationClub } from '@/services/teams';
import { message } from 'antd';

export default {
  namespace: 'federationClubs',

  state: {},

  reducers: {
    receiveClubsByFederationId(state, { payload }) {
      return {
        ...state,
        [payload.teamId]: payload.users,
      };
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const response = yield call(loadFederationClubs, payload);

        yield put({
          type: 'receiveClubsByFederationId',
          payload: {
            federationId: payload.federationId,
            clubs: response,
          },
        });
      } catch (e) {
        // não faz nada
      }
    },

    *create({ payload }, { call, put }) {
      try {
        const response = yield call(createFederationClub, payload);

        yield put({
          type: 'receiveClubsByFederationId',
          payload: {
            federationId: payload.federationId,
            clubs: response,
          },
        });

        message.success('Clube criado com sucesso!');
      } catch (e) {
        message.error('Não foi possível adicionar o membro!');
      }
    },
  },
};
