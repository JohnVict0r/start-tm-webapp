import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List, Card, Button, Skeleton, Avatar, Popconfirm, Icon } from 'antd';

import { usersSelector } from '@/selectors/admin';
import { rolesSelector } from '@/selectors/global';
import Link from 'umi/link';
import { Select } from 'antd/lib/select';

import styles from './Users.less';

@connect(state => ({
  roles: rolesSelector(state),
  users: usersSelector,
  loading: state.loading.effects['admin/fetchUsers'],
}))
class Users extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/fetchUsers',
    });
  }

  handleDelete = userId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/deleteUser',
      payload: {
        user: userId,
      },
    });
  };

  handleChangeRole = (userId, role) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'admin/changeUserRole',
      payload: {
        user: userId,
        roleId: role,
      },
    });
  };

  render() {
    const { roles, users, loading } = this.props;

    return (
      <React.Fragment>
        <Card
          className={styles.standardList}
          bordered={false}
          title="Usuários"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
        >
          <List
            rowKey="id"
            loading={loading}
            dataSource={users}
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
      </React.Fragment>
    );
  }
}

export default Users;
