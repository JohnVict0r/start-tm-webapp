import { formatMessage } from 'umi/locale';
import { routerRedux } from 'dva/router';
import { notification } from 'antd';

import {
  createWorkflow,
  createWorkflowForTeam,
  createWorkflowForProject,
} from '@/services/workflows';

export default {
  namespace: 'createWorkflow',

  state: {
    error: null,
  },

  effects: {
    *create(
      {
        payload: { owner, values },
      },
      { call, put }
    ) {
      let callCreateWorkflow;

      if (!owner) {
        callCreateWorkflow = [createWorkflow, values];
      } else if (owner.type === 'projects') {
        callCreateWorkflow = [createWorkflowForProject, owner.id, values];
      } else if (owner.type === 'teams') {
        callCreateWorkflow = [createWorkflowForTeam, owner.id, values];
      } else {
        callCreateWorkflow = [createWorkflow, values];
      }

      const response = yield call(...callCreateWorkflow);

      if (response.errors) {
        yield put({
          type: 'handleFormError',
          payload: response,
        });
      } else {
        yield put({
          type: 'entities/mergeEntities',
          payload: response.entities,
        });

        yield put({
          type: 'receiveItem',
          payload: {
            item: response.result,
          },
        });

        yield put(routerRedux.push(`/workflows/${response.result}`));

        notification.success({
          message: formatMessage({ id: 'app.form.workflows.success' }),
        });
      }
    },
  },

  reducers: {
    handleFormError(state, { payload }) {
      return {
        ...state,
        error: payload,
      };
    },
  },
};
