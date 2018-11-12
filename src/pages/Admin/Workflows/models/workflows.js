import { loadWorkFlows, createWorkflow } from '@/services/workflows';
import { formatMessage } from 'umi/locale';
import { routerRedux } from 'dva/router';
import { notification } from 'antd';

const initialPaginatioState = {
  count: 0,
  currentPage: 0,
  links: [],
  perPage: 0,
  total: 0,
  totalPages: 0,
};

export default {
  namespace: 'workflows',

  state: {
    workflows: {
      items: [],
      pagination: initialPaginatioState,
    },
    createForm: {
      error: null,
    },
  },

  effects: {
    *fetchWorkflows(_, { call, put }) {
      const response = yield call(loadWorkFlows);

      yield put({
        type: 'entities/mergeEntities',
        payload: response.entities,
      });

      yield put({
        type: 'receiveWorkflows',
        payload: {
          items: response.result,
          pagination: response.pagination,
        },
      });
    },
    *createWorkflow({ payload }, { call, put }) {
      const response = yield call(createWorkflow, payload);
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
    receiveWorkflows(state, { payload }) {
      return {
        ...state,
        workflows: {
          ...state.workflows,
          items: payload.items,
          pagination: payload.pagination,
        },
      };
    },
    handleFormError(state, { payload }) {
      return {
        ...state,
        createForm: {
          error: payload,
        },
      };
    },
  },
};
