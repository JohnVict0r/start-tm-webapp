import React from 'react';
import {Badge, Button, Dropdown, Menu, Tooltip} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import withRouter from 'umi/withRouter';
import ColumnList from '@/components/ColumnList';

import { DroppableZone, InnerCardList }  from './InnerCardList';
import styles from './CardList.less';

const CardList = ({ cardList, isDisabled, items, onClickNewCard }) => {

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
      <Menu.Item key="1">Editar lista</Menu.Item>
      <Menu.Item key="2">Desabilitar transições</Menu.Item>
    </Menu>
  );

  return (
    <ColumnList isDisabled={isDisabled}>
      <ColumnList.Header
        title={title}
        action={(
          <Dropdown overlay={menuOptions} trigger={['click']} placement="bottomRight">
            <Button size='small' icon='ellipsis' />
          </Dropdown>
        )}
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
}

export default withRouter(CardList);
