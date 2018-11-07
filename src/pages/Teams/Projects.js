import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { List, Card, Input, Button, Skeleton } from 'antd';

import { teamProjectsSelector } from './selectors/projects';

import styles from './Projects.less';

@connect(state => ({
  projects: teamProjectsSelector(state),
  loading: state.loading.effects['currentTeamProjects/fetch'],
}))
class BasicList extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'currentTeamProjects/fetch',
      payload: {
        id: match.params.id,
      },
    });
  }

  render() {
    const {
      projects: { items, pagination },
      loading,
      match,
    } = this.props;

    const extraContent = (
      <div className={styles.extraContent}>
        <Button
          type="primary"
          icon="plus"
          onClick={() =>
            router.push({
              pathname: '/projects/new',
              state: {
                owner: match.params.id,
              },
            })
          }
        >
          Projeto
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
      <div className={styles.standardList}>
        <Card
          className={styles.listCard}
          bordered={false}
          title="Projetos"
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
                    title={<Link to={`/projects/${item.id}`}>{item.name}</Link>}
                    description={item.description}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}

export default BasicList;
