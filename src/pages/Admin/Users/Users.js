import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List, Card, Skeleton, Avatar, Select } from 'antd';

import { usersSelector } from '@/selectors/admin';
import { systemRolesSelector } from '@/selectors/global';
import Link from 'umi/link';

import styles from './Users.less';

@connect(state => ({
  roles: systemRolesSelector(state),
  users: usersSelector(state),
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

  render() {
    const {
      roles,
      users: { items, pagination },
      loading,
    } = this.props;

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
              <List.Item
                actions={[
                  <Select
                    defaultValue={role.name}
                    style={{ width: 140 }}
                    onChange={roleName => {
                      this.handleChangeRole(user.id, roleName);
                    }}
                  >
                    {roles.map(r => (
                      <Select.Option key={r.name} value={r.name}>
                        {` ${r.name} `}
                      </Select.Option>
                    ))}
                  </Select>,
                  // ,
                  // <Popconfirm
                  //   title="Tem certeza?"
                  //   icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                  //   onConfirm={() => this.handleDelete(user.id)}
                  // >
                  //   <Button type="danger" icon="delete" ghost />
                  // </Popconfirm>,
                ]}
              >
                <Skeleton title={false} loading={loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={user.avatar} shape="square" size="large" />}
                    title={<Link to={`/user/${user.id}`}>{user.name}</Link>}
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
