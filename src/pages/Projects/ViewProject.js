import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Icon, Rate, Menu, Popover, Dropdown, Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import { projectBoardsSelector } from './selectors/projects';

import styles from './ViewProject.less';

const projectOptionsMenu = (
  <Menu>
    <Menu.Item key="1">Gerenciar Membros</Menu.Item>
    <Menu.Item key="2">Gerenciar Quadros</Menu.Item>
  </Menu>
);

const boardOptionsMenu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="edit" />
      Editar Quadro
    </Menu.Item>
  </Menu>
);

@connect((state, ownProps) => ({
  project: state.entities.projects[ownProps.match.params.id],
  boards: projectBoardsSelector(state),
  loading: state.loading.effects['projects/fetchProject'],
  loadingBoards: state.loading.effects['projects/fetchProjectBoards'],
}))
class ViewProject extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'projects/fetchProject',
      payload: match.params.id,
    });

    dispatch({
      type: 'projects/fetchProjectBoards',
      payload: match.params.id,
    });
  }

  render() {
    const { project, boards, loadingBoards, children } = this.props;

    if (!project) {
      return <PageLoading />;
    }

    const action = (
      <Fragment>
        <Rate count={1} />
        <Popover
          title="Descrição do projeto"
          content={project.description}
          overlayClassName={styles.descriptionPopover}
          trigger="click"
        >
          <Button type="dashed" shape="circle" icon="info-circle-o" />
        </Popover>
        <Button.Group>
          <Button icon="pie-chart">Relatórios</Button>
          <Dropdown overlay={projectOptionsMenu} placement="bottomRight">
            <Button>
              <Icon type="ellipsis" />
            </Button>
          </Dropdown>
        </Button.Group>
      </Fragment>
    );

    const boardsMenu = (
      <Menu>
        {boards.map(r => (
          <Menu.Item key={r.id}>{r.name}</Menu.Item>
        ))}
      </Menu>
    );

    const content = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.boardSelector}>
          <Input.Group compact>
            <Dropdown overlay={boardsMenu} disabled={loadingBoards}>
              <Button>
                <Icon type="project" className={styles.boardIcon} />
                Quadro:{' '}
                <span>
                  <b>Livro Educação a Distância: Capítulo 01</b>
                </span>
                <Icon type="down" />
              </Button>
            </Dropdown>
            <Dropdown overlay={boardOptionsMenu} placement="bottomRight">
              <Button>
                <Icon type="ellipsis" />
              </Button>
            </Dropdown>
          </Input.Group>
        </div>
        <Button type="primary" icon="plus">
          Quadro
        </Button>
      </div>
    );

    return (
      <PageHeaderWrapper
        hiddenBreadcrumb
        title={project.name}
        // logo={<Rate count={1} />}
        action={action}
        content={content}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default ViewProject;
