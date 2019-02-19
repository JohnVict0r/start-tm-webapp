import React, { PureComponent } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Skeleton, Button } from 'antd';

import styles from './TedsList.less';

@connect(state => ({
  goals: state.goals.items.map(i => state.entities.goals[i]),
  loading: state.loading.effects['goals/fetchTedGoals'],
}))
class GoalsList extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'goals/fetchTedGoals',
      payload: {
        tedId: match.params.tedId,
      },
    });
  }

  render() {
    const { goals, loading, match } = this.props;

    return (
      <div className={styles.standardList}>
        <Button
          type="dashed"
          style={{ width: '100%', marginBottom: 8 }}
          icon="plus"
          onClick={() => router.push(`/teds/${match.params.tedId}/goals/new`)}
        >
          Meta
        </Button>
        <List
          size="large"
          rowKey="id"
          loading={loading}
          dataSource={goals}
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
      </div>
    );
  }
}

export default GoalsList;
