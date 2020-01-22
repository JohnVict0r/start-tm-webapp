import { message } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';

import Schema from '@/services/Schema';
import {
  loadAthletesByClubId,
  createAthlete,
  uploadAthlete,
  // loadAthlete,
} from '@/services/athletes';
// import { initialPaginationState } from '@/utils/getPaginationProps';

export default {
  namespace: 'athletes',

  state: {
    byClubId: {},
  },

  reducers: {
    handleError(state, { payload }) {
      return {
        ...state,
        error: payload,
      };
    },
    receiveAthletesByClubId(state, { payload }) {
      const { club_id, athleteIds, meta } = payload;
      return {
        ...state,
        byClubId: {
          ...state.byClubId,
          [club_id]: {
            athleteIds,
            meta,
          },
        },
      };
    },
  },

  effects: {
    *save({ payload }, { call, put }) {
      let response;
      try {
        response = payload.id
          ? yield call(uploadAthlete, payload)
          : yield call(createAthlete, payload);

        if (!!response[0] && response[0].field) {
          // const error = {
          //   response,
          //   status: 422,
          //   skipToJson: true,
          // };

          // yield put({
          //   type: 'validation/handleError',
          //   payload: {
          //     effect: 'athletes/save',
          //     error,
          //   },
          // });

          // TODO remover isso depois que corrigir o setFormWithErrors({...})
          response.map(res => message.error(res.message));
          return;
        }
        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data: response,
            schema: Schema.ATHLETE,
          },
        });

        payload.id
          ? message.success(formatMessage({ id: 'app.athlete.success-edited' }))
          : message.success(formatMessage({ id: 'app.athlete.success-created' }));

        router.push(`/athletes/${result}`);
      } catch (e) {
        console.log(e);
        payload.id
          ? message.error(formatMessage({ id: 'app.athlete.failed-edited' }))
          : message.error(formatMessage({ id: 'app.athlete.failed-created' }));
      }
    },

    *fetchByClub({ payload }, { call, put }) {
      try {
        const response = yield call(loadAthletesByClubId, payload);

        const { data, ...meta } = response;

        // normaliza os dados retornados e
        // funde com o state.entities
        const result = yield put.resolve({
          type: 'entities/normalize',
          payload: {
            data,
            schema: Schema.ATHLETE_ARRAY,
          },
        });

        yield put({
          type: 'receiveAthletesByClubId',
          payload: {
            club_id: payload.club_id,
            athleteIds: result,
            meta,
          },
        });
      } catch (error) {
        // não faz nada
      }
    },
  },
};
