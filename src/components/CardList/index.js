import React, { Component } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Scrollbars } from 'react-custom-scrollbars';
import CardItem from './CardItem';
import styles from './index.less';

const CardList = ({ cardList, isDisabled, items }) => (
  <div className={styles.column}>
    <div className={styles.header}>
      <h4 className={styles.title}>{cardList.name}</h4>
      {cardList.canCreateCard && <Button className={styles.add} icon="plus" size="small" />}
    </div>
    <Scrollbars autoHeight autoHeightMin={400} autoHeightMax={800} className={styles.scroll}>
      <List
        listId={cardList.id.toString()}
        listType="CARD"
        cards={items}
        isDropDisabled={isDisabled}
      />
    </Scrollbars>
  </div>
);

const List = ({ cards, listId, listType, isDropDisabled }) => (
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
    return cards.map((card, index) => (
      <Draggable key={card.id} draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          <CardItem
            key={card.id}
            card={card}
            isDragging={snapshot.isDragging}
            provided={provided}
          />
        )}
      </Draggable>
    ));
  }
}

export default CardList;
