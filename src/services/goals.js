import callApi from '@/utils/callApi';
import schema from './Schema';

export const loadGoals = ({ tedId }) => callApi(`teds/${tedId}/goals`, schema.GOAL_ARRAY).get();

export const createGoal = ({ tedId, goal }) =>
  callApi(`teds/${tedId}/goals`, schema.TED).post(goal);
