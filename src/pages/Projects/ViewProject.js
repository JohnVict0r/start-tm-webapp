import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import Redirect from 'umi/redirect';
import router from 'umi/router';
import { Button, Icon, Menu, Dropdown } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import { FavoriteIcon } from '@/components/Favorite';
import { makeProjectSelector } from './selectors/projects';

import styles from './ViewProject.less';

@connect((state, ownProps) => {
  const projectSelector = makeProjectSelector({ id: ownProps.match.params.projectId });
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

  renderBoardSelector = selectedBoard => {
    const { project, loading, match } = this.props;
    const boardsMenu = (
      <Menu selectable>
        {project.boards.map(r => (
          <Menu.Item key={r.id}>
            <Link to={`/projects/${match.params.projectId}/boards/${r.id}`}>{r.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );

    const selectorText = project.boards.length > 0 ? 'Selecione um quadro' : 'Ainda não há quadros';

    const placeholder = selectedBoard ? (
      <Ellipsis lines={1}>
        <span className={styles.hiddenInMobile}>Quadro: </span>
        <b>{selectedBoard.name}</b>
      </Ellipsis>
    ) : (
      selectorText
    );

    return (
      <div className={styles.extraContent}>
        <Dropdown overlay={boardsMenu} disabled={project.boards.length === 0 || loading}>
          <Button className={styles.selector}>
            <Icon type="project" className={styles.boardIcon} />
            <span className={styles.placeholder}>{placeholder}</span>
            <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  };

  render() {
    const { project, match, children, location } = this.props;

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
      return <Redirect to={`${match.url}/new-board`} />;
    }

    const projectOptionsMenu = (
      <Menu>
        <Menu.Item key="1">
          <Link to={`${match.url}/workflows`}>Fluxos de Trabalho</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <Link to={`${match.url}/edit`}>Editar Projeto</Link>
        </Menu.Item>
      </Menu>
    );

    const action = (
      <div>
        <FavoriteIcon
          className={styles.action}
          onClick={this.handleFavorite}
          favorited={project.favorited}
        />
        <Button disabled>TED</Button>
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

    let selectedBoard;

    // está acessando um quadro
    if (/^\/projects\/[0-9]+\/boards\/[0-9]+\/?.*/.test(location.pathname)) {
      const boarId = location.pathname.split('/')[4];
      selectedBoard = project.boards.find(b => b.id.toString() === boarId);
    }

    const boardOptionsMenu = (
      <Menu>
        <Menu.Item key="1" disabled>
          <Link to={`${match.url}/workflows`}>Selecionar como principal</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" disabled>
          <Link to={`${match.url}/members`}>Editar Quadro</Link>
        </Menu.Item>
      </Menu>
    );

    const extra = (
      <div className={styles.extraContent}>
        <Button.Group>
          <Button
            type="primary"
            onClick={() => router.push(`/projects/${match.params.projectId}/new-board`)}
          >
            <Icon type="plus" />
            <span className={styles.hiddenInMobile}>Quadro</span>
          </Button>
          <Dropdown overlay={boardOptionsMenu} placement="bottomRight">
            <Button>
              <Icon type="ellipsis" />
            </Button>
          </Dropdown>
        </Button.Group>
      </div>
    );

    const inBoard = /\/boards\//.test(location.pathname);

    return (
      <Fragment>
        <PageHeaderWrapper
          logo={
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
          }
          title={
            <Link to={match.url}>
              <Ellipsis lines={1}>{project.name}</Ellipsis>
            </Link>
          }
          action={action}
          extraContent={inBoard && extra}
          content={inBoard && this.renderBoardSelector(selectedBoard)}
        >
          {children}
        </PageHeaderWrapper>
      </Fragment>
    );
  }
}

export default ViewProject;
