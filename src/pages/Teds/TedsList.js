import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { List, Card, Skeleton, Button } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { exploreTedsSelector } from '@/selectors/teds';

import styles from './TedsList.less';

@connect(state => ({
  teds: exploreTedsSelector(state),
  loading: state.loading.effects['teds/fetchUserTeds'],
}))
class TedsList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'teds/fetchUserTeds',
    });
  }

  render() {
    const {
      teds: { items, pagination },
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
        title="Minhas TED's"
        action={[
          <Button key="1" type="primary" icon="plus" onClick={() => router.push('/teds/new')}>
            TED
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
                      title={<Link to={`/teds/${item.id}`}>{item.name}</Link>}
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

export default TedsList;
