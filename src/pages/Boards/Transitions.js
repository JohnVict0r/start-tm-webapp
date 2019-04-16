import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Checkbox, List } from 'antd';
import ColumnList from '@/components/ColumnList';
import styles from "./SaveCardList.less";

@connect(state => ({
  loading: state.loading.effects['boards/toggleTransition'],
}))
class Transitions extends PureComponent {
  handleChange = (checked, item) => {
    const { dispatch, currentCardList } = this.props;
    dispatch({
      type: 'boards/toggleTransition',
      payload: {
        teamId: currentCardList.teamId,
        transition: {
          action: checked ? 'add' : 'remove',
          'card_list_id': currentCardList.id,
          'disabled_card_list_id': item.id
        }
      }
    });
  };

  render() {
    const {
      cardLists,
      currentCardList,
      onClose,
      loading,
    } = this.props;

    const disabledCardListsIds = currentCardList.disabledTransitions.map(i => i.disabledCardListId);

    const transitions = cardLists
      .filter(i => i.id !== currentCardList.id)
      .map((item) => ({
        ...item,
        checked: !disabledCardListsIds.includes(item.id)
      }));

    return (
      <ColumnList>
        <ColumnList.Header
          title='Transições'
          actions={[
            <Button
              key='1'
              size='small'
              onClick={onClose}
            >
              Voltar
            </Button>
          ]}
        />
        <div className={styles.content}>
          <List
            size="small"
            bordered
            loading={loading}
            dataSource={transitions}
            renderItem={item => (
              <List.Item>
                <Checkbox
                  checked={item.checked}
                  onChange={(e) => this.handleChange(e.target.checked, item)}
                >
                  {item.name}
                </Checkbox>
              </List.Item>
            )}
          />
        </div>
      </ColumnList>
    );
  }
}

export default Transitions;
