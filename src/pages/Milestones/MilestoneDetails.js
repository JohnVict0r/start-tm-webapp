import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, List } from 'antd';
import CardsListItem from '@/pages/Containers/CardsListItem';
import { exploreMilestoneCardsSelector } from './selectors/milestones';

@connect(state => {
  return {
    cards: exploreMilestoneCardsSelector(state),
    loadingCards: state.loading.effects['milestoneCards/fetchCards'],
  };
})
class MilestoneDetails extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'milestoneCards/fetchCards',
      payload: {
        id: match.params.milestoneId,
        page: 0,
      },
    });
  }

  render() {
    const {
      cards: { items, pagination },
      loadingCards,
    } = this.props;

    const paginationProps = {
      current: pagination.currentPage,
      pageSize: pagination.perPage,
      total: pagination.total,
      hideOnSinglePage: true,
    };

    return (
      <Fragment>
        <Card bordered={false} title="Tarefas">
          <List
            size="large"
            rowKey="id"
            loading={loadingCards}
            pagination={paginationProps}
            dataSource={items}
            renderItem={item => <CardsListItem cardId={item.id} />}
          />
        </Card>
      </Fragment>
    );
  }
}

export default MilestoneDetails;
