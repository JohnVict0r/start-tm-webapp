import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Avatar, List, Card, Skeleton } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { exploreTeamsSelector } from './selectors/teams';

import styles from './TeamsList.less';

@connect(state => ({
  teams: exploreTeamsSelector(state),
  loading: state.loading.effects['teams/fetchUserTeams'],
}))
class TeamsList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'teams/fetchUserTeams',
    });
  }

  render() {
    const {
      teams: { items, pagination },
      loading,
    } = this.props;

    const paginationProps = {
      current: pagination.currentPage,
      pageSize: pagination.perPage,
      total: pagination.total,
      hideOnSinglePage: true,
    };

    return (
      <PageHeaderWrapper title="Minhas Equipes">
        <div className={styles.standardList}>
          <Card className={styles.listCard} bordered={false}>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={items}
              renderItem={item => (
                <List.Item>
                  <Skeleton title={false} loading={loading} active>
                    <List.Item.Meta
                      avatar={<Avatar shape="square" src={item.project.avatar} />}
                      title={
                        <Link to={`/teams/${item.id}`}>{`${item.project.name} － ${
                          item.name
                        }`}
                        </Link>
                      }
                      description={item.description}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default TeamsList;
