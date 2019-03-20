import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Card, Button, Skeleton } from 'antd';
import { formatMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
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
      <PageHeaderWrapper
        title={formatMessage({ id: 'menu.teams.my-teams' })}
        action={[
          <Button key="1" type="primary" icon="plus" onClick={() => router.push('/teams/new')}>
            Equipe
          </Button>,
        ]}
      >
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
                      title={<Link to={`/teams/${item.id}`}>{item.name}</Link>}
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
