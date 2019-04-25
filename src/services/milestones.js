import callApi from '@/utils/callApi';
import schema from './Schema';

export const loadMilestones = ({ teamId }) =>
  callApi(`teams/${teamId}/milestones`, schema.MILESTONE_ARRAY).get();

export const createMilestone = ({ teamId, milestone }) =>
  callApi(`teams/${teamId}/milestones`, schema.MILESTONE).post(milestone);
