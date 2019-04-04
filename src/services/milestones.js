import callApi from '@/utils/callApi';
import schema from './Schema';

export const loadMilestones = ({ boardId }) => callApi(`boards/${boardId}/milestones`, schema.MILESTONE_ARRAY).get();

export const createMilestone = ({ boardId, milestone }) =>
  callApi(`boards/${boardId}/milestones`, schema.MILESTONE).post(milestone);
