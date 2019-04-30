import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Button, Icon, Menu, Dropdown } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import { FavoriteIcon } from '@/components/Favorite';
import { makeProjectSelector } from './selectors/projects';

@connect((state, ownProps) => {
  const projectSelector = makeProjectSelector({ id: ownProps.match.params.projectId });
  return {
    project: projectSelector(state),
    loading: state.loading.effects['projects/fetchProject'],
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

  render() {
    const { project, match, children } = this.props;

    if (!project) {
      return <PageLoading />;
    }

    const projectOptionsMenu = (
      <Menu>
        <Menu.Item key="1">
          <Link to={`${match.url}/edit`}>Editar Projeto</Link>
        </Menu.Item>
      </Menu>
    );

    const action = (
      <div>
        <FavoriteIcon
          style={{ padding: '0 8px' }}
          onClick={this.handleFavorite}
          favorited={project.favorited}
        />
        <Button.Group>
          <Button onClick={() => router.push(`${match.url}/members`)}>Membros</Button>
          <Dropdown overlay={projectOptionsMenu} placement="bottomRight">
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
          <img alt={project.name} src={project.avatar} />
        }
        title={project.name}
        action={action}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default ProjectView;
