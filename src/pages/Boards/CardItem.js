import React from 'react';
import classNames from 'classnames';
import { Card, Icon } from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import Ellipsis from '@/components/Ellipsis';
import AvatarList from '@/components/AvatarList';
import timeAgo from '@/utils/timeAgo';

import styles from './CardItem.less';

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

const RenderAvatarList = ({ card }) => (
  <div className={styles.avatarList}>
    <AvatarList
      size="mini"
      maxLength={3}
      excessItemsStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
    >
      {card.members.map(member => (
        <AvatarList.Item
          key={`${card.id}-avatar-${member.id}`}
          src={member.pictureUrl}
          tips={member.name}
        />
      ))}
    </AvatarList>
  </div>
);

const CardItem = ({ card, isDragging, provided, style, match }) => (
  <div
    className={styles.cardWrapper}
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={style}
  >
    <Link to={`${match.url}/cards/${card.id}`}>
      <Card
        bordered={false}
        className={classNames(styles.card, {
          [styles.dragging]: isDragging,
        })}
        bodyStyle={{ padding: '12px' }}
      >
        <Ellipsis lines={3}>{card.name}</Ellipsis>
        <div className={styles.cardMetaInfo}>
          <div className={styles.left}>
            <Due date={card.due} />
          </div>
          {card.members.length > 0 && <RenderAvatarList card={card} />}
        </div>
      </Card>
    </Link>
  </div>
);

export default withRouter(CardItem);
