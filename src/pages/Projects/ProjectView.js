import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import { FavoriteButton } from '@/components/Favorite';
import { makeProjectSelector } from './selectors/projects';

@connect((state, ownProps) => {
  const projectSelector = makeProjectSelector({ id: ownProps.match.params.projectId });
  return {
    project: projectSelector(state),
    loading: state.loading.effects['projects/fetchProject'],
    favoriting: state.loading.effects['projects/favoriteProject'],
  };
})
class ProjectView extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'projects/fetchProject',
      payload: match.params.projectId,
    });
  }

  handleFavorite = () => {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'projects/favoriteProject',
      payload: match.params.projectId,
    });
  };

  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'details':
        router.push(`${match.url}/details`);
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
    const { project, favoriting, match, location, children } = this.props;

    if (!project) {
      return <PageLoading />;
    }

    const tabList = [
      {
        key: 'details',
        tab: 'Detalhes',
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
      <FavoriteButton
        loading={favoriting}
        onClick={this.handleFavorite}
        favorited={project.favorited}
      />
    );

    return (
      <PageHeaderWrapper
        title={project.name}
        logo={<img alt={project.name} src={project.avatar} />}
        content={project.description}
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

export default ProjectView;
