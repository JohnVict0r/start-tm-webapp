import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Card, Input, Skeleton } from 'antd';
import { formatMessage } from 'umi/locale';
import { teamWorkflowsSelector } from './selectors/workflows';

import CardNewWorkflow from '@/components/NewWorkflow';

import styles from './Workflows.less';

@connect(state => ({
  workflows: teamWorkflowsSelector(state),
  loading: state.loading.effects['currentTeamWorkflows/fetch'],
}))
class Workflows extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'currentTeamWorkflows/fetch',
      payload: {
        id: match.params.id,
      },
    });
  }

  render() {
    const {
      workflows: { items, pagination },
      loading,
      match,
    } = this.props;

    const extraContent = (
      <div className={styles.extraContent}>
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

    const owner = {
      type: 'teams',
      id: match.params.id,
    };
    return (
      <React.Fragment>
        <Card
          bordered={false}
          title={formatMessage({ id: 'app.admin.workflows.new' })}
          style={{ marginTop: 24 }}
        >
          <CardNewWorkflow owner={owner} />
        </Card>
        <Card
          className={styles.listCard}
          bordered={false}
          title={formatMessage({ id: 'menu.workflows' })}
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
                    title={<Link to={`/workflows/${item.id}`}>{item.name}</Link>}
                    description={item.description}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
      </React.Fragment>
    );
  }
}

export default Workflows;
