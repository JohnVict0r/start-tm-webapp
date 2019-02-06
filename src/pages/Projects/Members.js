import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Card, Button, Avatar, Skeleton, Select, Popconfirm, Icon } from 'antd';
import NewMemberForm from './NewMember';
import { projectMembersSelector } from './selectors/members';
import { rolesSelector } from '@/selectors/global';

import styles from './Members.less';

@connect(state => ({
  roles: rolesSelector(state),
  members: projectMembersSelector(state),
  loading: state.loading.effects['currentProjectMembers/fetch'],
}))
class ProjectMembers extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'currentProjectMembers/fetch',
      payload: {
        id: match.params.projectId,
      },
    });
  }

  handleDelete = memberId => {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'currentProjectMembers/deleteMember',
      payload: {
        id: match.params.projectId,
        member: memberId,
      },
    });
  };

  handleChangeRole = (memberId, role) => {
    const { dispatch, match } = this.props;

    dispatch({
      type: 'currentProjectMembers/changeMemberRole',
      payload: {
        projectId: match.params.projectId,
        member: memberId,
        roleId: role,
      },
    });
  };

  render() {
    const { roles, members, loading, match } = this.props;

    return (
      <React.Fragment>
        <Card bordered={false} title="Adicionar membro" style={{ marginTop: 24 }}>
          <NewMemberForm projectId={match.params.projectId} />
        </Card>
        <Card
          className={styles.standardList}
          bordered={false}
          title="Membros"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
        >
          <List
            rowKey="id"
            loading={loading}
            dataSource={members}
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

export default ProjectMembers;
