import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import { Button, Rate, Popconfirm, Dropdown, Icon, Menu } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import router from 'umi/router';

const tabList = [
  {
    key: 'projects',
    tab: formatMessage({ id: 'menu.projects' }),
  },
  {
    key: 'workflows',
    tab: formatMessage({ id: 'menu.workflows' }),
  },
  {
    key: 'members',
    tab: formatMessage({ id: 'menu.teams.team.members' }),
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

  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'projects':
        router.push(`${match.url}/projects`);
        break;
      case 'workflows':
        router.push(`${match.url}/workflows`);
        break;
      case 'members':
        router.push(`${match.url}/members`);
        break;
      default:
        break;
    }
  };

  render() {
    const { team, children, match, location } = this.props;

    if (!team) {
      return <PageLoading />;
    }

    const actionpart = (
      <Menu>
        <Menu.Item onClick={() => router.push(`/teams/${match.params.id}/edit`)} key="1">
          Alterar Equipe
        </Menu.Item>
      </Menu>
    );

    const action = (
      <Fragment>
        <Popconfirm
          title={formatMessage({ id: 'app.team.suregetout' })}
          onConfirm={() => {}}
          okText="Sim"
          cancelText="Não"
        >
          <Button type="danger">Sair</Button>
        </Popconfirm>
        <Dropdown overlay={actionpart} placement="bottomLeft">
          <Button>
            <Icon type="ellipsis" />
          </Button>
        </Dropdown>
      </Fragment>
    );

    return (
      <PageHeaderWrapper
        title={team.name}
        logo={<Rate count={1} />}
        action={action}
        content={team.description}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.url}/`, '')}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default ViewTeam;
