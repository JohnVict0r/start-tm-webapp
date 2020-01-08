import { message } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';
import Schema from '@/services/Schema';
import { loadEventsByFederationId, createEvent, uploadEvent } from '@/services/events';
import { initialPaginationState } from '@/utils/getPaginationProps';

export default {
  namespace: 'events',

  state: {
    byFederationId: {},
    forCurrentUser: {
      clubIds: [],
      meta: initialPaginationState,
    },
  },

  reducers: {
    handleError(state, { payload }) {
      return {
        ...state,
        error: payload,
      };
    },
    receiveEventsByFederationId(state, { payload }) {
      const { federation_id, eventIds, meta } = payload;
      return {
        ...state,
        byFederationId: {
          ...state.byFederationId,
          [federation_id]: {
            eventIds,
            meta,
          },
        },
      };
    },
  },

  effects: {
    *save({ payload }, { call, put }) {
      try {
        const response = payload.id
          ? yield call(uploadEvent, payload)
          : yield call(createEvent, payload);

        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data: response,
            schema: Schema.EVENT,
          },
        });

        payload.id
          ? message.success(formatMessage({ id: 'app.club.success-edited' }))
          : message.success(formatMessage({ id: 'app.club.success-created' }));

        router.push(`/events/${result}`);
      } catch (e) {
        payload.id
          ? message.error(formatMessage({ id: 'app.club.failed-edited' }))
          : message.error(formatMessage({ id: 'app.club.failed-created' }));
      }
    },

    // *fetchEvent({ payload }, { call, put }) {
    //   try {
    //     const response = yield call(loadClub, payload);

    //     // normaliza os dados retornados e
    //     // funde com o state.entities
    //     yield put({
    //       type: 'entities/normalize',
    //       payload: {
    //         data: response,
    //         schema: Schema.EVENT,
    //       },
    //     });
    //   } catch (e) {
    //     // Não faz nada
    //   }
    // },

    *fetchByFederation({ payload }, { call, put }) {
      try {
        const response = yield call(loadEventsByFederationId, payload);

        const { data, ...meta } = response;

        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data,
            schema: Schema.EVENT_ARRAY,
          },
        });

        yield put({
          type: 'receiveEventsByFederationId',
          payload: {
            federation_id: payload.owner_id,
            eventIds: result,
            meta,
          },
        });
      } catch (error) {
        // não faz nada
      }
    },
  },
};
