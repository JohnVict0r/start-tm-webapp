import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Card, Input, Skeleton, Form } from 'antd';
import { workflowsSelector } from './selectors/workflows';

import NewWorkflow from '@/components/NewWorkflow';

import styles from './Workflows.less';

@connect(state => ({
  workflows: workflowsSelector(state),
  createWorkflow: state.createWorkflow,
  loading: state.loading.effects['workflows/fetchWorkflows'],
  submitting: state.loading.effects['createWorkflow/create'],
}))
@Form.create()
class Workflows extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'currentWorkflows/fetchCurrentWorkflows',
    });
  }

  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'createWorkflow/create',
        payload: {
          values,
        },
      });
    }
  };

  render() {
    const {
      workflows: { items, pagination },
      loading,
      form,
      createWorkflow,
      submitting,
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

    return (
      <div className={styles.standardList}>
        <Card bordered style={{ marginTop: 24 }}>
          <NewWorkflow
            form={form}
            validation={createWorkflow.error}
            submitting={submitting}
            onSubmit={this.handleSubmit}
          />
        </Card>
        <Card
          className={styles.listCard}
          bordered={false}
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraContent}
        >
          <List
            size="large"
            rowKey="id"
            loading={loading}
            dataSource={items}
            pagination={paginationProps}
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
      </div>
    );
  }
}

export default Workflows;
