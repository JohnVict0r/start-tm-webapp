import { createSelector } from 'reselect';

// eslint-disable-next-line
export const makeStatus = ({ workflowId }) =>
  createSelector(
    state => state.entities.status,
    ( status ) => {
      console.log(status);
      return { status };
    }
  );
