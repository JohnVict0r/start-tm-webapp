import React, { useState } from 'react';
import {Badge, Button, Dropdown, Menu, Tooltip} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import withRouter from 'umi/withRouter';
import ColumnList from '@/components/ColumnList';

import { DroppableZone, InnerCardList }  from './InnerCardList';
import styles from './CardList.less';
import SaveCardList from "./SaveCardList";
import NewCard from "./NewCard";

const CardList = ({ cardList, isDisabled, items }) => {

  const [ showEdit, setShowEdit ] = useState(false);
  const [ newCard, setNewCard ] = useState(false);

  if (showEdit) {
    return (
      <SaveCardList
        current={cardList}
        onClose={() => setShowEdit(false)}
      />
    );
  }

  if (newCard) {
    return (
      <NewCard
        cardListId={cardList.id}
        onClose={() => setNewCard(false)}
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
      <Menu.Item key="1" onClick={() => setShowEdit(true)}>Editar lista</Menu.Item>
      {/* <Menu.Item key="2">Desabilitar transições</Menu.Item> */}
    </Menu>
  );

  const actions = (
    <span>
      {cardList.canCreateCard && (
        <Button
          key='1'
          icon="plus"
          size="small"
          onClick={() => setNewCard(true)}
        />
      )}
      <Dropdown key='2' overlay={menuOptions} trigger={['click']} placement="bottomRight">
        <Button size='small' icon='ellipsis' />
      </Dropdown>
    </span>
  );

  return (
    <ColumnList isDisabled={isDisabled}>
      <ColumnList.Header
        title={title}
        actions={actions}
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
  );
}

export default withRouter(CardList);
