import callApi from '@/utils/callApi';
import schema from './Schema';
import { stringify } from 'qs';

export const createComment = ({ commentableType, commentableId, comment }) =>
  callApi(`comments`, schema.COMMENT_ARRAY).post({
    ...comment,
    ctype: commentableType,
    cid: commentableId,
  });

export const listComments = ({ commentableType, commentableId }) =>
  callApi(
    `comments?${stringify({ ctype: commentableType, cid: commentableId })}`,
    schema.COMMENT_ARRAY
  ).get();
