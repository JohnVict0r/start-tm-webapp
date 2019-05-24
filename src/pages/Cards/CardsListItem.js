import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Skeleton, Icon } from 'antd';

import timeAgo from '@/utils/timeAgo';
import { cardSelector } from '@/selectors/cards';
import AvatarUserList from '@/pages/Containers/AvatarUserList';
import styles from './CardsListItem.less';

const IconText = ({ type, text }) => (
  <span style={{ marginRight: 8 }}>
    <Icon type={type} style={{ marginRight: 4 }} />
    {text}
  </span>
);

const Due = ({ date }) => {
  const due = timeAgo(date);
  return (
    due && (
      <div className={styles.due}>
        <Icon type="clock-circle" /> {due}
      </div>
    )
  );
};

@connect((state, props) => ({
  card: cardSelector(state, props),
}))
class CardsListItem extends PureComponent {
  render() {
    const { card } = this.props;
    const { project, team, status } = card;

    const description = (
      <div>
        <p className={styles.project}>{`${project.name} / ${team.name}`}</p>
        <div className={styles.infoList}>
          <div className={styles.due} style={{ background: status.color }}>
            {status.displayName}
          </div>
          <Due date={card.due} />
          <AvatarUserList usersIds={card.members} />
          <IconText type="paper-clip" text={card.filesCount} />
          <IconText type="message" text={card.commentsCount} />
        </div>
      </div>
    );

    return (
      <List.Item>
        <Skeleton title={false} loading={false} active>
          <List.Item.Meta
            title={<Link to={`/teams/${team.id}/board/cards/${card.id}`}>{card.name}</Link>}
            description={description}
          />
        </Skeleton>
      </List.Item>
    );
  }
}

export default CardsListItem;
