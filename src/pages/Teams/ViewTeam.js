import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Icon } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';

const menu = (
  <Menu mode="vertical">
    <Menu.Item key="1">
      <Icon type="team" /> Gerenciar membros
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="fork" /> Fluxos de trabalho
    </Menu.Item>
  </Menu>
);

const action = (
  <Fragment>
    <Button.Group>
      <Button>Novo projeto</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    </Button.Group>
    <Button type="danger">Sair da equipe</Button>
  </Fragment>
);

const tabList = [
  {
    key: 'projects',
    tab: 'Projetos',
  },
  {
    key: 'workflows',
    tab: 'Workflows',
  },
  {
    key: 'members',
    tab: 'Membros',
  },
];

@connect((state, ownProps) => ({
  team: state.entities.teams[ownProps.match.params.id],
  loading: state.loading.effects['teams/fetchTeam'],
}))
class ViewTeam extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'teams/fetchTeam',
      payload: match.params.id,
    });
  }

  render() {
    const { team } = this.props;

    if (!team) {
      return <PageLoading />;
    }

    return (
      <PageHeaderWrapper
        title={team.name}
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        action={action}
        content={team.description}
        tabList={tabList}
      >
        <h1>{team.name}</h1>
      </PageHeaderWrapper>
    );
  }
}

export default ViewTeam;
