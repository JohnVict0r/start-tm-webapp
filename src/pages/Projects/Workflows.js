import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Form, Card, Input, Skeleton } from 'antd';
import { formatMessage } from 'umi/locale';
import { projectWorkflowsSelector } from './selectors/workflows';

import NewWorkflow from '@/components/NewWorkflow';

import styles from './Workflows.less';

@connect(state => ({
  workflows: projectWorkflowsSelector(state),
  createWorkflow: state.createWorkflow,
  loading: state.loading.effects['currentTeamWorkflows/fetch'],
  submitting: state.loading.effects['createWorkflow/create'],
}))
@Form.create()
class Workflows extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'currentProjectWorkflows/fetch',
      payload: {
        id: match.params.id,
      },
    });
  }

  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch, match } = this.props;
      dispatch({
        type: 'createWorkflow/create',
        payload: {
          owner: {
            type: 'projects',
            id: match.params.id,
          },
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
      <React.Fragment>
        <Card
          bordered={false}
          title={formatMessage({ id: 'app.admin.workflows.new' })}
          style={{ marginTop: 24 }}
        >
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
