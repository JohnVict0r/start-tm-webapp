import React, { useState } from 'react';
import { Badge, Button, Dropdown, Menu, Tooltip } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import withRouter from 'umi/withRouter';
import { Draggable } from 'react-beautiful-dnd';
import ColumnList from '@/components/ColumnList';
import { DroppableZone, InnerCardList } from './InnerCardList';
import SaveCardList from './SaveCardList';
import NewCard from './NewCard';
import Transitions from './Transitions';

import styles from './CardList.less';

const CardList = ({ cardList, board, items, index, isDisabled }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [showTransitions, setShowTransitions] = useState(false);

  if (showEdit) {
    return <SaveCardList current={cardList} onClose={() => setShowEdit(false)} />;
  }

  if (newCard) {
    return <NewCard cardListId={cardList.id} onClose={() => setNewCard(false)} />;
  }

  if (showTransitions) {
    return (
      <Transitions
        cardLists={board.cardlists}
        currentCardList={cardList}
        onClose={() => setShowTransitions(false)}
      />
    );
  }

  const title = (
    <>
      <Tooltip
        title={`Status: ${cardList.status.displayName}`}
        arrowPointAtCenter
        mouseEnterDelay={1}
      >
        <Badge color={cardList.status.color} />
      </Tooltip>
      {cardList.name}
    </>
  );

  const menuOptions = (
    <Menu>
      <Menu.Item key="1" onClick={() => setShowEdit(true)}>
        Editar lista
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setShowTransitions(true)}>
        Transições
      </Menu.Item>
    </Menu>
  );

  const actions = (
    <span>
      {cardList.canCreateCard && (
        <Button key="1" icon="plus" size="small" onClick={() => setNewCard(true)} />
      )}
      <Dropdown key="2" overlay={menuOptions} trigger={['click']} placement="bottomRight">
        <Button size="small" icon="ellipsis" />
      </Dropdown>
    </span>
  );

  return (
    <Draggable draggableId={`${cardList.name}-${cardList.id}`} index={index}>
      {provided => (
        <ColumnList
          isDisabled={isDisabled}
          innerRef={provided.innerRef}
          {...provided.draggableProps}
        >
          <ColumnList.Header
            title={title}
            actions={actions}
            className={styles.header}
            {...provided.dragHandleProps}
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
        </ColumnList>
      )}
    </Draggable>
  );
};

export default withRouter(CardList);
