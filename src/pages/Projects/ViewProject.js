import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import Redirect from 'umi/redirect';
import { Button, Icon, Menu, Popover, Dropdown } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import { FavoriteIcon } from '@/components/Favorite';
import { makeProjectSelector } from './selectors/projects';

import styles from './ViewProject.less';

@connect((state, ownProps) => {
  const projectSelector = makeProjectSelector({ id: ownProps.match.params.id });
  return {
    project: projectSelector(state),
    loading: state.loading.effects['projects/fetchProject'],
  };
})
class ViewProject extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'projects/fetchProject',
      payload: match.params.id,
    });
  }

  handleFavorite = () => {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'projects/favoriteProject',
      payload: match.params.id,
    });
  };

  render() {
    const { project, loading, match, children, location } = this.props;

    if (!project) {
      return <PageLoading />;
    }

    // ao acessar o projeto, se houver um quadro a
    // ser selecionado automaticamente faça-o, do contrário,
    // redirecione para criação de um novo quadro.
    if (match.isExact) {
      if (project.selectedBoardId) {
        return <Redirect to={`${match.url}/boards/${project.selectedBoardId}`} />;
      }
      return <Redirect to={`${match.url}/boards/new`} />;
    }

    const projectOptionsMenu = (
      <Menu>
        <Menu.Item key="1">
          <Link to={`${match.url}/workflows`}>Fluxos de Trabalho</Link>
        </Menu.Item>
        <Menu.Item key="2">Membros</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <Link to={`${match.url}/edit`}>Editar Projeto</Link>
        </Menu.Item>
      </Menu>
    );

    const boardsMenu = (
      <Menu selectable>
        {project.boards.map(r => (
          <Menu.Item key={r.id}>
            <Link to={`/projects/${match.params.id}/boards/${r.id}`}>{r.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );

    let selectedBoard;

    // está acessando um quadro
    if (/^\/projects\/[0-9]+\/boards\/[0-9]+\/?.*/.test(location.pathname)) {
      const boarId = location.pathname.split('/')[4];
      selectedBoard = project.boards.find(b => b.id.toString() === boarId);
    }

    const content = (
      <div className={styles.optionsBar}>
        <div className={styles.left}>
          <FavoriteIcon
            className={styles.action}
            onClick={this.handleFavorite}
            favorited={project.favorited}
          />
          <div className={styles.title}>
            <Popover
              title="Descrição do projeto"
              content={project.description}
              overlayClassName={styles.descriptionPopover}
              mouseEnterDelay={1}
            >
              <Link to={`${match.url}`}>
                <Ellipsis lines={1} tooltip>
                  {project.name}
                </Ellipsis>
              </Link>
            </Popover>
          </div>
          <Dropdown overlay={projectOptionsMenu} placement="bottomRight">
            <Button className={styles.settings}>
              <span>
                <Icon type="setting" />
              </span>
            </Button>
          </Dropdown>
        </div>
        <div className={styles.right}>
          <Dropdown overlay={boardsMenu} disabled={loading}>
            <Button>
              <Icon type="project" className={styles.boardIcon} />
              {selectedBoard ? (
                <span>
                  {'Quadro: '} <b>{selectedBoard.name}</b>
                </span>
              ) : (
                'Selecione um quadro'
              )}
              <Icon type="down" />
            </Button>
          </Dropdown>
          <Link to={`/projects/${match.params.id}/boards/new`}>
            <Button type="primary">Novo Quadro</Button>
          </Link>
        </div>
      </div>
    );

    return (
      <Fragment>
        <PageHeaderWrapper hiddenBreadcrumb content={content} wide={false}>
          {children}
        </PageHeaderWrapper>
      </Fragment>
    );
  }
}

export default ViewProject;
