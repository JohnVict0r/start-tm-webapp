import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import Redirect from 'umi/redirect';
import { Button, Icon, Rate, Menu, Popover, Dropdown } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
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

    const action = (
      <div>
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
    );

    const title = (
      <div>
        <Rate count={1} className={styles.action} />
        <Popover
          title="Descrição do projeto"
          content={project.description}
          overlayClassName={styles.descriptionPopover}
          mouseEnterDelay={1}
        >
          <Link to={`${match.url}`}>{project.name}</Link>
        </Popover>
        <Dropdown overlay={projectOptionsMenu} placement="bottomRight">
          <Icon type="ellipsis" className={styles.action} />
        </Dropdown>
      </div>
    );

    return (
      <Fragment>
        <PageHeaderWrapper hiddenBreadcrumb title={title} action={action} wide={false}>
          {children}
        </PageHeaderWrapper>
      </Fragment>
    );
  }
}

export default ViewProject;
