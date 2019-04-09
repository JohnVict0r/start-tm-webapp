import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { Button, Dropdown, Icon, Menu } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';

import { makeTeamSelector } from './selectors/teams';


@connect((state, ownProps) => {
  const teamSelector = makeTeamSelector({ id: ownProps.match.params.teamId });
  return {
    team: teamSelector(state),
    loading: state.loading.effects['teams/fetchTeam'],
  };
})
class TeamView extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'teams/fetchTeam',
      payload: match.params.teamId,
    });
  }

  render() {
    const { team, children, match } = this.props;

    if (!team) {
      return <PageLoading />;
    }

    const teamOptionsMenu = (
      <Menu>
        <Menu.Item key="1">
          <Link to={`${match.url}/members`}>Membros</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <Link to={`${match.url}/edit`}>Editar Quadro</Link>
        </Menu.Item>
      </Menu>
    );

    const action = (
      <div>
        {/* <FavoriteIcon
          style={{ padding: '0 8px' }}
          onClick={this.handleFavorite}
          favorited={project.favorited}
        /> */}
        <Button.Group>
          <Button icon='clock-circle' onClick={() => router.push(`${match.url}/milestones`)}>Entregáveis</Button>
          <Dropdown overlay={teamOptionsMenu} placement="bottomRight">
            <Button>
              <Icon type="ellipsis" />
            </Button>
          </Dropdown>
        </Button.Group>
      </div>
    );

    return (
      <PageHeaderWrapper
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        title={(
          <span>
            <Link to={`/projects/${team.project.id}`}>{team.project.name}</Link>
            <span style={{ fontWeight: '300' }}>{' > '}</span>
            {team.name}
          </span>
        )}
        action={action}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default TeamView;
