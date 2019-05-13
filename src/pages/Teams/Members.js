import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Card, Button, Avatar, Select, Popconfirm, Icon, Tag } from 'antd';
import { rolesSelector, loggedInUserSelector } from '@/selectors/global';
import NewMemberForm from './NewMember';
import { teamMembersSelector } from './selectors/members';

import styles from './Members.less';
import {makeTeamSelector} from "./selectors/teams";

@connect((state, ownProps) => {
  const teamSelector = makeTeamSelector({ id: ownProps.match.params.teamId });
  return {
    currentUser: loggedInUserSelector(state),
    team: teamSelector(state),
    roles: rolesSelector(state),
    members: teamMembersSelector(state),
    loading: state.loading.effects['currentTeamMembers/fetch'],
  }
})
class TeamMembers extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'currentTeamMembers/fetch',
      payload: {
        id: match.params.teamId,
      },
    });
  }

  handleDelete = memberId => {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'currentTeamMembers/deleteMember',
      payload: {
        id: match.params.teamId,
        member: memberId,
      },
    });
  };

  handleChangeRole = (memberId, role) => {
    const { dispatch, match } = this.props;

    dispatch({
      type: 'currentTeamMembers/changeMemberRole',
      payload: {
        teamId: match.params.teamId,
        memberId,
        role,
      },
    });
  };

  renderItemActions = (user, role) => {
    const { currentUser, team } = this.props;

    if (user.id === currentUser.id) {
      return [<Tag color='red'>Você</Tag>];
    }

    if (user.id === team.creator) {
      return [<Tag color='blue'>Proprietário</Tag>];
    }

    const { roles } = this.props;

    return [
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
      <Popconfirm
        disabled
        title="Tem certeza?"
        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
        onConfirm={() => this.handleDelete(user.id)}
      >
        <Button type="danger" icon="delete" ghost />
      </Popconfirm>,
    ];
  };

  render() {
    const { members, loading, match } = this.props;

    return (
      <React.Fragment>
        <Card bordered={false} title="Adicionar membro" style={{ marginTop: 24 }}>
          <NewMemberForm teamId={match.params.teamId} />
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
              <List.Item actions={this.renderItemActions(user, role)}>
                <List.Item.Meta
                  avatar={<Avatar src={user.avatar} shape="square" size="large" />}
                  title={<Link to={`/user/${user.id}`}>{user.name}</Link>}
                  description={user.email}
                />
              </List.Item>
            )}
          />
        </Card>
      </React.Fragment>
    );
  }
}

export default TeamMembers;
