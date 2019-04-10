import React, { Component } from 'react';
import classNames from 'classnames';
import { Button, Icon, List, Tag } from 'antd';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import { Scrollbars } from 'react-custom-scrollbars';
import withRouter from 'umi/withRouter';

import ColumnList from '../ColumnList';
import CardItem from './CardItem';
import styles from './index.less';


const CardList = ({ cardList, isDisabled, items, onClickNewCard }) => (
  <ColumnList isDisabled={isDisabled}>
    <ColumnList.Header
      title={cardList.name}
      action={[
        <Tag key='1' color={cardList.status.color}>{cardList.status.displayName}</Tag>,
        <Icon key='2' type="ellipsis" />
      ]}
    />
    <Scrollbars autoHeight autoHeightMin={400} autoHeightMax={800} className={styles.scroll}>
      <DroppableZone
        droppableId={cardList.id.toString()}
        type="CARD"
        isDropDisabled={isDisabled}
      >
        <InnerCardList cards={items} />
      </DroppableZone>
    </Scrollbars>
    { cardList.canCreateCard && (
      <ColumnList.Footer
        action={(
          <Button
            onClick={onClickNewCard}
            icon="plus"
            size="small"
            block
          >
            Adicionar Tarefa
          </Button>
        )}
      />
    )}
  </ColumnList>
);

const DroppableZone = ({ children, droppableId, type, isDropDisabled }) => (
  <Droppable droppableId={droppableId} type={type} isDropDisabled={isDropDisabled}>
    {(dropProvided, dropSnapshot) => (
      <div
        className={classNames(styles.listWrapper, {
          [styles.dragging]: dropSnapshot.isDraggingOver,
          [styles.disabled]: isDropDisabled,
        })}
        {...dropProvided.droppableProps}
      >
        <div className={styles.dropzone} ref={dropProvided.innerRef}>
          {children}
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
