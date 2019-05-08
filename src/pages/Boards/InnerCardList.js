import React, { Component } from 'react';
import classNames from 'classnames';
import { List } from 'antd';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

import CardItem from './CardItem';
import styles from './CardList.less';

export const DroppableZone = ({ children, droppableId, type, isDropDisabled }) => (
  <Droppable droppableId={droppableId} type={type} isDropDisabled={isDropDisabled}>
    {(dropProvided, dropSnapshot) => (
      <div
        className={classNames(styles.listWrapper, {
          [styles.dragging]: dropSnapshot.isDraggingOver,
          [styles.disabled]: isDropDisabled,
        })}
        ref={dropProvided.innerRef}
        {...dropProvided.droppableProps}
      >
        {children}
        {dropProvided.placeholder}
      </div>
    )}
  </Droppable>
);

export class InnerCardList extends Component {
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
      <Draggable key={card.id} draggableId={`c-${card.id}`} index={index}>
        {(provided, snapshot) => (
          <NaturalDragAnimation style={provided.draggableProps.style} snapshot={snapshot}>
            {style => (
              <CardItem
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
