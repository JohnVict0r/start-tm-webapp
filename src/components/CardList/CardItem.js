import React from 'react';
import classNames from 'classnames';
import { Card, Tag, Icon, Tooltip } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import AvatarList from '@/components/AvatarList';
import timeAgo from '@/utils/timeAgo';
import { priorityFilter } from '@/utils/labels';

import styles from './index.less';

// const CardItem = ({ card, isDragging, provided, match }) => {
//   // const priority = priorityFilter(card.priority)
//   // const due = timeAgo(card.due)
//
//   return (
//     <Link
//       // to={`${match.url}/cards/${card.id}`}
//       to={`/cards/${card.id}`}
//       className={classNames(styles.carditem, { [styles.carditem.dragging]: isDragging })}
//       innerRef={provided.innerRef}
//       {...provided.draggableProps}
//       {...provided.dragHandleProps}
//     >
//       <div className={styles.carditemSubheader}>
//         {card.name}
//         {/* <AvatarMembers members={card.members} compact />
//         <div className='card-status'>
//           <Due due={due} />
//           <Icon name={priority.icon} style={{ color: priority.color }} />
//         </div> */}
//       </div>
//       {/* <Header content={card.name} /> */}
//     </Link>
//   )
// }

const Due = ({ date }) => {
  const due = timeAgo(date);
  return due && <Tag color="red">{due}</Tag>;
};

const Priority = ({ icon, label, className, style }) => (
  <Tooltip title={`Prioridade: ${label}`}>
    <div className={className}>
      <Icon type={icon} style={style} />
    </div>
  </Tooltip>
);

const CardItem = ({ card, isDragging, provided }) => {
  const priority = priorityFilter(card.priority);
  // const due = timeAgo(card.due)

  return (
    <div
      className={styles.cardWrapper}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Card
        className={classNames(styles.card, { [styles.card.dragging]: isDragging })}
        bodyStyle={{ padding: '12px' }}
        hoverable
        // cover={<img alt={item.title} src={item.cover} />}
        // ref={provided.innerRef}
        // {...provided.draggableProps}
        // {...provided.dragHandleProps}
      >
        <div className={styles.cardMetaInfo}>
          <div className={styles.left}>
            <Priority
              className={styles.priority}
              icon={priority.icon}
              label={priority.label}
              style={priority.style}
            />
            <Due date={card.due} />
          </div>
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
        </div>
        <Ellipsis lines={3}>{card.description}</Ellipsis>
      </Card>
    </div>
  );
};

export default CardItem;
