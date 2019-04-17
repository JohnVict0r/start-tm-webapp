import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Card, Button, Avatar, Popconfirm, Icon } from 'antd';
import NewMemberForm from './NewMember';
import { projectMembersSelector } from './selectors/members';

import styles from './Members.less';

@connect(state => ({
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
              <List.Item
                actions={[
                  <>
                    {role.name !== 'Proprietário' && (
                      <Popconfirm
                        disabled
                        title="Tem certeza?"
                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                        onConfirm={() => this.handleDelete(user.id)}
                      >
                        <Button type="danger" icon="delete" ghost />
                      </Popconfirm>
                    )}
                  </>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={user.pictureUrl} shape="square" size="large" />}
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
