import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import {List, Card, Button, Avatar, Popconfirm, Icon, Tag} from 'antd';
import { loggedInUserSelector } from '@/selectors/global';
import NewMemberForm from './NewMember';
import { projectMembersSelector } from './selectors/members';
import { makeProjectSelector } from './selectors/projects';

import styles from './Members.less';

@connect((state, ownProps) => {
  const projectSelector = makeProjectSelector({ id: ownProps.match.params.projectId });
  return {
    currentUser: loggedInUserSelector(state),
    project: projectSelector(state),
    members: projectMembersSelector(state),
    loading: state.loading.effects['currentProjectMembers/fetch'],
  }
})
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

  renderItemActions = (user, role) => {
    const { currentUser, project } = this.props;

    if (user.id === currentUser.id) {
      return [<Tag color='red'>Você</Tag>];
    }

    if (user.id === project.creator) {
      return [<Tag color='blue'>Proprietário</Tag>];
    }

    return [
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

export default ProjectMembers;
