import { stringify } from 'qs';
import callApi from '@/utils/callApi';
import schema from './Schema';

export const loadMilestone = ({ id }) => callApi(`milestones/${id}`, schema.MILESTONE).get();

export const loadCards = ({ id, page }) =>
  callApi(`milestones/${id}/cards?${stringify({ page })}`, schema.CARD_ARRAY).get();

export const loadMilestones = ({ teamId }) =>
  callApi(`teams/${teamId}/milestones`, schema.MILESTONE_ARRAY).get();

export const createMilestone = ({ teamId, milestone }) =>
  callApi(`teams/${teamId}/milestones`, schema.MILESTONE).post(milestone);

export const updateMilestone = ({ id, milestone }) =>
  callApi(`milestones/${id}`, schema.MILESTONE).put(milestone);
