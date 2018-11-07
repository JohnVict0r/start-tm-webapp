import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Card, Input, Button, Skeleton } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import NewTeamModal from '@/components/NewTeamModal';
import { exploreTeamsSelector } from './selectors/teams';

import styles from './TeamsList.less';

@connect(state => ({
  teams: exploreTeamsSelector(state),
  loading: state.loading.effects['teams/fetchUserTeams'],
}))
class TeamsList extends PureComponent {
  state = {
    visible: false,
    done: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'teams/fetchUserTeams',
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;

      this.setState({
        done: true,
      });

      dispatch({
        type: 'teams/createTeam',
        payload: values,
      });
    }
  };

  render() {
    const {
      teams: { items, pagination },
      loading,
    } = this.props;
    const { visible, done } = this.state;

    const extraContent = (
      <div className={styles.extraContent}>
        <Button
          type="primary"
          icon="plus"
          onClick={this.showModal}
          ref={component => {
            /* eslint-disable */
            this.addBtn = findDOMNode(component);
            /* eslint-enable */
          }}
        >
          Equipe
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
            title="Minhas equipes"
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

        <NewTeamModal
          visible={visible}
          done={done}
          onDone={this.handleDone}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      </PageHeaderWrapper>
    );
  }
}

export default TeamsList;
