import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Card, Input, Button, Avatar, Skeleton, Select, Popconfirm, Icon } from 'antd';
import NewMemberForm from './NewMember';
import { teamMembersSelector } from './selectors/members';

import styles from './Members.less';

@connect(state => ({
  members: teamMembersSelector(state),
  loading: state.loading.effects['currentTeamMembers/fetch'],
}))
class TeamMembers extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'currentTeamMembers/fetch',
      payload: {
        id: match.params.id,
      },
    });
  }

  handleDelete = memberId => {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'currentTeamMembers/deleteMember',
      payload: {
        id: match.params.id,
        member: memberId,
      },
    });
  };

  render() {
    const { members, loading, match } = this.props;

    const extraContent = (
      <div className={styles.extraContent}>
        <Input.Search
          className={styles.extraContentSearch}
          placeholder="Buscar"
          onSearch={() => ({})}
        />
      </div>
    );

    return (
      <React.Fragment>
        <Card bordered={false} title="Adicionar membro" style={{ marginTop: 24 }}>
          <NewMemberForm teamId={match.params.id} />
        </Card>
        <Card
          className={styles.standardList}
          bordered={false}
          title="Membros"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraContent}
        >
          <List
            rowKey="id"
            loading={loading}
            dataSource={members}
            renderItem={({ user, role }) => (
              <List.Item
                actions={[
                  <Select defaultValue={role.name} style={{ width: 140 }} onChange={() => {}}>
                    <Select.Option value="Administrador">Administrador</Select.Option>
                    <Select.Option value="Proprietário">Proprietário</Select.Option>
                    <Select.Option value="Gerente">Gerente</Select.Option>
                    <Select.Option value="Colaborador">Colaborador</Select.Option>
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

export default TeamMembers;
