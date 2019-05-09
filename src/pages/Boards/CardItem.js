import React from 'react';
import classNames from 'classnames';
import { Card, Icon } from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import Ellipsis from '@/components/Ellipsis';
import AvatarList from '@/components/AvatarList';
import timeAgo from '@/utils/timeAgo';

import styles from './CardItem.less';

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
          src={member.avatar}
          tips={member.name}
        />
      ))}
    </AvatarList>
  </div>
);

const CardItem = ({ card, isDragging, provided, style, match }) => {
  const cover = card.files.find(i => i.mimeType === 'image/jpeg' || i.mimeType === 'image/png');
  return (
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
          cover={cover && (
            <div
              className={styles.cover}
              style={{ backgroundImage: `url(${cover.url})` }}
            />
          )}
          className={classNames(styles.card, {
            [styles.dragging]: isDragging,
          })}
          bodyStyle={{ padding: '12px' }}
        >
          <Ellipsis lines={3}>{card.name}</Ellipsis>
          <div className={styles.cardMetaInfo}>
            <div className={styles.left}>
              <IconText type='paper-clip' text={card.filesCount} />
              <IconText type='message' text={card.commentsCount} />
              <Due date={card.due} />
            </div>
            {card.members.length > 0 && <RenderAvatarList card={card} />}
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default withRouter(CardItem);
