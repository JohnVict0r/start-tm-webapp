import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Card, Input, Button, Skeleton } from 'antd';

import { adminWorkflowsSelector } from './selectors/workflows';

import styles from './Workflows.less';

@connect(state => ({
  workflows: adminWorkflowsSelector(state),
  loading: state.loading.effects['currentAdminWorkflows/fetch'],
}))
class BasicList extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'currentAdminWorkflows/fetch',
      payload: {
        id: match.params.id,
      },
    });
  }

  render() {
    const {
      workflows: { items },
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

    return (
      <div className={styles.standardList}>
        <Card
          className={styles.listCard}
          bordered={false}
          title="Workflows"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraContent}
        >
          <Button
            type="dashed"
            style={{ width: '100%', marginBottom: 8 }}
            icon="plus"
            onClick={() => {}}
            ref={component => {
              /* eslint-disable */
              this.addBtn = findDOMNode(component);
              /* eslint-enable */
            }}
          >
            Novo workflow
          </Button>
          <List
            size="large"
            rowKey="id"
            loading={loading}
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
      </div>
    );
  }
}

export default BasicList;
