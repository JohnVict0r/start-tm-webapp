import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Card, Skeleton } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { exploreProjectsSelector } from '../Projects/selectors/projects';

import styles from './TedsList.less';

@connect(state => ({
  projects: exploreProjectsSelector(state),
  loading: state.loading.effects['projects/fetchUserProjects'],
}))
class TedsList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'projects/fetchUserProjects',
    });
  }

  render() {
    const {
      projects: { items, pagination },
      loading,
    } = this.props;

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
            bordered={false}
            title="Minhas TED's"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
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
                      title={
                        <Link to={`/projects/${item.id}`}>
                          {item.owner.name}
                          {' / '}
                          {item.name}
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

export default TedsList;
