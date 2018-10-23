import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Card, Input, Button, Avatar, Skeleton } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import NewTeamModal from '@/components/NewTeamModal';
import { exploreProjectsSelector } from './selectors/projects';

import styles from './ProjectsList.less';

@connect(state => ({
  projects: exploreProjectsSelector(state),
  loading: state.loading.effects['projects/fetchUserProjects'],
}))
class ProjectsList extends PureComponent {
  state = {
    visible: false,
    done: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'projects/fetchUserProjects',
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
        type: 'projects/createProject',
        payload: values,
      });
    }
  };

  render() {
    const {
      projects: { items, pagination },
      loading,
    } = this.props;
    const { visible, done } = this.state;

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
      <PageHeaderWrapper title="Meus projetos">
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="Projetos"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
              onClick={this.showModal}
              ref={component => {
                /* eslint-disable */
                this.addBtn = findDOMNode(component);
                /* eslint-enable */
              }}
            >
              Novo projeto
            </Button>
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
                      avatar={<Avatar src={item.logo} shape="square" size="large" />}
                      title={<Link to={`/projects/${item.id}`}>{item.name}</Link>}
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

export default ProjectsList;
