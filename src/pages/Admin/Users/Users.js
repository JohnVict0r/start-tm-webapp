import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List, Card, Skeleton, Avatar, Button, Tag } from 'antd';

import { router } from 'umi';
import { usersSelector } from '@/selectors/admin';
import { systemRolesSelector, loggedInUserSelector } from '@/selectors/global';

import styles from './Users.less';
import PageLoading from '@/components/PageLoading';

@connect(state => ({
  roles: systemRolesSelector(state),
  users: usersSelector(state),
  currentUser: loggedInUserSelector(state),
  loading: state.loading.effects['admin/fetchUsers'],
}))
class Users extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/fetchUsers',
      payload: {
        page: 0,
      },
    });
    dispatch({
      type: 'global/fetchRoles',
    });
  }

  handleDelete = userId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/deleteUser',
      payload: {
        userId,
      },
    });
  };

  handleChangeRole = (userId, role) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/updateUserRole',
      payload: {
        userId,
        role,
      },
    });
  };

  handleChangePage = page => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/fetchUsers',
      payload: {
        page,
      },
    });
  };

  renderItemActions = (user, role) => {
    const { currentUser } = this.props;

    if (user.id === currentUser.id) {
      return [<Tag color="red">Você</Tag>];
    }

    return [
      // <Popconfirm
      //   disabled
      //   title="Tem certeza?"
      //   icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
      //   onConfirm={() => this.handleDelete(user.id)}
      // >
      //   <Button type="danger" icon="delete" ghost />
      // </Popconfirm>,
      <Tag color="blue">{role.name}</Tag>,
      <Button
        shape="circle"
        icon="edit"
        size="large"
        onClick={() => router.push(`/admin/users/${user.id}/edit`)}
      />,
    ];
  };

  render() {
    const {
      users: { items, pagination },
      loading,
    } = this.props;

    if (!items) {
      return <PageLoading />;
    }
    /*
    TODO Implementar o searchUsers
    
    const extraContent = (
      <div className={styles.extraContent}>
        <Input.Search
          className={styles.extraContentSearch}
          placeholder="Buscar"
          onSearch={() => ({})}
        />
      </div>
    ); 
    */

    const paginationProps = {
      current: pagination.currentPage,
      pageSize: pagination.perPage,
      total: pagination.total,
      hideOnSinglePage: true,
      onChange: page => {
        this.handleChangePage(page);
      },
    };

    return (
      <div className={styles.standardList}>
        <Card
          className={styles.listCard}
          bordered={false}
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          /* extra={extraContent} */
        >
          <List
            size="large"
            rowKey="id"
            loading={loading}
            dataSource={items}
            pagination={paginationProps}
            renderItem={({ user, role }) => (
              <List.Item actions={this.renderItemActions(user, role)}>
                <Skeleton title={false} loading={loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={user.avatar} shape="square" size="large" />}
                    title={user.name}
                    description={user.email}
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

export default Users;
