import React from 'react';
import classNames from 'classnames';
import { Card, Icon } from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import Ellipsis from '@/components/Ellipsis';
import AvatarList from '@/components/AvatarList';
import timeAgo from '@/utils/timeAgo';

import styles from './CardItem.less';

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
  return (
    due && (
      <div className={styles.due}>
        <Icon type="clock-circle" /> {due}
      </div>
    )
  );
};

const priorityClass = ['lower', 'low', 'normal', 'high', 'higher'];

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

const CardItem = ({ card, isDragging, provided, style, match, board }) => (
  <div
    className={styles.cardWrapper}
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={style}
  >
    <Link to={{
      pathname:`/projects/${match.params.projectId}/boards/${match.params.boardId}/cards/${card.id}`,
      state: { board }
      }}
    >
      <Card
        bordered={false}
        className={classNames(styles.card, styles[priorityClass[card.priority - 1]], {
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
