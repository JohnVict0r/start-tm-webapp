import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
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
  static getDerivedStateFromProps(nextProps, prevState) {
    // não há quadro selecionado?
    if (!prevState.selectedBoard && !isEmpty(nextProps.boards)) {
      return {
        selectedBoard: nextProps.boards[0],
      };
    }
    return null;
  }

  state = {
    selectedBoard: null,
  };

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'projects/fetchProject',
      payload: match.params.id,
    });
  }

  componentDidUpdate(_, prevState) {
    const { match } = this.props;
    const { selectedBoard } = this.state;

    if (selectedBoard && selectedBoard !== prevState.selectedBoard) {
      router.push(`${match.url}/boards/${selectedBoard.id}`);
    }
  }

  onBoardSelect = ({ key }) => {
    const { match, boards } = this.props;
    this.setState({
      selectedBoard: boards.find(b => b.id.toString() === key),
    });
    router.push(`${match.url}/boards/${key}`);
  };

  render() {
    const { project, boards, loadingBoards, match, children } = this.props;
    const { selectedBoard } = this.state;

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
      <Menu selectable onSelect={this.onBoardSelect}>
        {boards.map(r => (
          <Menu.Item key={r.id}>
            <Link to={`${match.url}/boards/${r.id}`}>{r.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );

    const content = (
      <div className={styles.pageHeaderContent}>
        <Button type="primary" icon="plus">
          Quadro
        </Button>
        <div className={styles.boardSelector}>
          <Input.Group compact>
            <Dropdown overlay={boardOptionsMenu} placement="bottomRight">
              <Button>
                <Icon type="ellipsis" />
              </Button>
            </Dropdown>
            <Dropdown overlay={boardsMenu} disabled={loadingBoards}>
              <Button>
                <Icon type="project" className={styles.boardIcon} />
                {selectedBoard ? (
                  <span>
                    {'Quadro: '} <b>{selectedBoard.name}</b>
                  </span>
                ) : (
                  <span>Selecione um quadro</span>
                )}
                <Icon type="down" />
              </Button>
            </Dropdown>
          </Input.Group>
        </div>
      </div>
    );

    return (
      <Fragment>
        <PageHeaderWrapper
          hiddenBreadcrumb
          title={project.name}
          // logo={<Rate count={1} />}
          action={action}
          content={content}
        />
        <div className={styles.content}>
          <div className={`${styles.main}`}>{children}</div>
        </div>
      </Fragment>
    );
  }
}

export default ViewProject;
