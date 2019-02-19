import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List, Card, Button, Skeleton, Avatar, Select, Popconfirm, Icon } from 'antd';

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

  handleChangeRole = (userId, roleId) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'admin/updateUserRole',
      payload: {
        userId,
        roleId,
      },
    });
  };

  render() {
    const {
      roles,
      users: { items },
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
    
    TODO Verificar porque a paginação não está funcionando
    const paginationProps = {
      current: pagination.currentPage,
      pageSize: pagination.perPage,
      total: pagination.total,
      hideOnSinglePage: true,
    }; 
    */

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
            /* pagination={paginationProps} */

            renderItem={({ user, role }) => (
              <List.Item
                actions={[
                  <Select
                    defaultValue={role.id}
                    style={{ width: 140 }}
                    onChange={roleId => {
                      this.handleChangeRole(user.id, roleId);
                    }}
                  >
                    {roles.map(r => (
                      <Select.Option key={r.id} value={r.id}>
                        {' '}
                        {r.name}{' '}
                      </Select.Option>
                    ))}
                  </Select>,
                  <Popconfirm
                    title="Tem certeza?"
                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                    onConfirm={() => this.handleDelete(user.id)}
                  >
                    <Button type="danger" icon="delete" ghost />
                  </Popconfirm>,
                ]}
              >
                <Skeleton title={false} loading={loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={user.pictureUrl} shape="square" size="large" />}
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
