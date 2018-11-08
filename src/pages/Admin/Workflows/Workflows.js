import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { List, Card, Input, Button, Skeleton } from 'antd';
import { formatMessage } from 'umi/locale';
import { workflowsSelector } from './selectors/workflows';

import styles from './Workflows.less';

@connect(state => ({
  workflows: workflowsSelector(state),
  loading: state.loading.effects['admin/fetchWorkflows'],
}))
class Workflows extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/fetchWorkflows',
    });
  }

  render() {
    const {
      workflows: { items, pagination },
      loading,
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
        <Card
          className={styles.listCard}
          bordered={false}
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraContent}
        >
          <Button
            type="dashed"
            style={{ width: '100%', marginBottom: 8 }}
            icon="plus"
            onClick={() => router.push('/workflows/new')}
            ref={component => {
              /* eslint-disable */
              this.addBtn = findDOMNode(component);
              /* eslint-enable */
            }}
          >
            {formatMessage({ id: 'app.admin.workflows.create' })}
          </Button>
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
