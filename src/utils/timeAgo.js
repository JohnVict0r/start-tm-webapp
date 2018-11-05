import moment from 'moment/moment';

const timeAgo = due => {
  if (!due) {
    return null;
  }

  const currentTime = moment();
  const dueTime = moment(due);

  return currentTime.isAfter(dueTime) ? null : currentTime.to(dueTime);
};

export default timeAgo;
