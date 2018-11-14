import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Card, Input, Button, Skeleton } from 'antd';
import { FormattedMessage, formatMessage } from 'umi/locale';
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

    const extraContent = (
      <div className={styles.extraContent}>
        <Button type="primary" icon="plus" onClick={() => router.push('/teams/new')}>
          <FormattedMessage id="menu.admin.teams" />
        </Button>
        <Input.Search
          className={styles.extraContentSearch}
          placeholder="Buscar"
          onSearch={() => ({})}
        />
      </div>
    );

    const paginationProps = {
      current: pagination.currentPage,
      pageSize: pagination.perPage,
      total: pagination.total,
      hideOnSinglePage: true,
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            title={formatMessage({ id: 'menu.teams.my-teams' })}
            bordered={false}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
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
