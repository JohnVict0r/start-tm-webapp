import React, { Component } from 'react';
import classNames from 'classnames';
import { Button, List } from 'antd';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import { Scrollbars } from 'react-custom-scrollbars';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import CardItem from './CardItem';
import styles from './index.less';

// <div className={styles.column}>
const CardList = ({ cardList, isDisabled, items, board, match }) => (
  <div
    className={classNames(styles.column, {
      [styles.disabled]: isDisabled,
    })}
  >
    <div className={styles.header}>
      <h4 className={styles.title}>{cardList.name}</h4>
      {cardList.canCreateCard && (
        <Link
          to={{
            pathname: `/projects/${match.params.projectId}/cards/new`,
            state: { board, cardList },
          }}
        >
          <Button className={styles.add} icon="plus" size="small" />
        </Link>
      )}
    </div>
    <Scrollbars autoHeight autoHeightMin={400} autoHeightMax={800} className={styles.scroll}>
      <DroppableList
        listId={cardList.id.toString()}
        listType="CARD"
        cards={items}
        isDropDisabled={isDisabled}
      />
    </Scrollbars>
  </div>
);

const DroppableList = ({ cards, listId, listType, isDropDisabled }) => (
  <Droppable droppableId={listId} type={listType} isDropDisabled={isDropDisabled}>
    {(dropProvided, dropSnapshot) => (
      <div
        className={classNames(styles.listWrapper, {
          [styles.dragging]: dropSnapshot.isDraggingOver,
          [styles.disabled]: isDropDisabled,
        })}
        {...dropProvided.droppableProps}
      >
        <div className={styles.dropzone} ref={dropProvided.innerRef}>
          <InnerCardList cards={cards} />
          {dropProvided.placeholder}
        </div>
      </div>
    )}
  </Droppable>
);

class InnerCardList extends Component {
  shouldComponentUpdate(nextProps) {
    const { cards } = this.props;
    return nextProps.cards !== cards;
  }

  render() {
    const { cards } = this.props;

    if (cards.length === 0) {
      return <List dataSource={[]} />;
    }

    return cards.map((card, index) => (
      <Draggable key={card.id} draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          <NaturalDragAnimation style={provided.draggableProps.style} snapshot={snapshot}>
            {style => (
              <CardItem
                key={card.id}
                card={card}
                isDragging={snapshot.isDragging}
                style={style}
                provided={provided}
              />
            )}
          </NaturalDragAnimation>
        )}
      </Draggable>
    ));
  }
}

export default withRouter(CardList);
