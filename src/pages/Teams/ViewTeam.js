import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import { Button, Rate, Dropdown, Icon, Menu, Popover } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import router from 'umi/router';
import styles from './ViewTeam.less';

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

    const teamOptionsMenu = (
      <Menu>
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          Relatórios
        </Menu.Item>
        <Menu.Item key="2" onClick={() => router.push(`/teams/${match.params.id}/edit`)}>
          <Icon type="edit" />
          Editar Equipe
        </Menu.Item>
      </Menu>
    );

    const action = (
      <Fragment>
        <Rate count={1} />
        <Popover
          title="Descrição da equipe"
          content={team.description}
          overlayClassName={styles.descriptionPopover}
          trigger="click"
        >
          <Button type="dashed" shape="circle" icon="info-circle-o" />
        </Popover>
        <Button.Group>
          <Button>Sair da Equipe</Button>
          <Dropdown overlay={teamOptionsMenu} placement="bottomRight">
            <Button>
              <Icon type="ellipsis" />
            </Button>
          </Dropdown>
        </Button.Group>
      </Fragment>
    );

    return (
      <PageHeaderWrapper
        hiddenBreadcrumb
        title={team.name}
        action={action}
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
