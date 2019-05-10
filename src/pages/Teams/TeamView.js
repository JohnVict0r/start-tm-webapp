import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button } from 'antd';
import { FavoriteButton } from '@/components/Favorite';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';

import { makeTeamSelector } from './selectors/teams';

@connect((state, ownProps) => {
  const teamSelector = makeTeamSelector({ id: ownProps.match.params.teamId });
  return {
    team: teamSelector(state),
    loading: state.loading.effects['teams/fetchTeam'],
    favoriting: state.loading.effects['teams/favoriteTeam'],
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

  handleFavorite = () => {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'teams/favoriteTeam',
      payload: match.params.teamId,
    });
  };

  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'milestones':
        router.push(`${match.url}/milestones`);
        break;
      case 'members':
        router.push(`${match.url}/members`);
        break;
      case 'edit':
        router.push(`${match.url}/edit`);
        break;
      default:
        break;
    }
  };

  render() {
    const { team, favoriting, children, location, match } = this.props;

    if (!team) {
      return <PageLoading />;
    }

    const tabList = [
      {
        key: 'milestones',
        tab: 'Entregáveis',
      },
      {
        key: 'members',
        tab: 'Membros',
      },
      {
        key: 'edit',
        tab: 'Configurações',
      },
    ];

    const extra = (
      <>
        <FavoriteButton
          loading={favoriting}
          onClick={this.handleFavorite}
          favorited={team.favorited}
        />
        <Button
          type='primary'
          icon='project'
          onClick={() => router.push(`${match.url}/board`)}
        >
          Quadro
        </Button>
      </>
    );

    return (
      <PageHeaderWrapper
        title={team.name}
        subTitle={team.project.name}
        logo={<img alt={team.project.name} src={team.project.avatar} />}
        content={team.description}
        extra={extra}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.url}/`, '')}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default TeamView;
