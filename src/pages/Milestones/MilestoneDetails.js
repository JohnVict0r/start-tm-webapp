import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card, List, Skeleton } from 'antd';
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
            renderItem={item => (
              <List.Item>
                <Skeleton title={false} loading={loadingCards} active>
                  <List.Item.Meta
                    title={
                      <Link to={`/teams/${item.teamId}/board/cards/${item.id}`}>{item.name}</Link>
                    }
                    description={item.description}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
      </Fragment>
    );
  }
}

export default MilestoneDetails;
