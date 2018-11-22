import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { Input, Menu, Button, Dropdown, Icon } from 'antd';
import PageLoading from '@/components/PageLoading';
import { makeProjectSelector, makeBoardSelector } from './selectors/projects';
import Board from './Board';

import styles from './Board.less';

const boardOptionsMenu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="edit" />
      Editar Quadro
    </Menu.Item>
  </Menu>
);

@connect((state, ownProps) => {
  const { match } = ownProps;
  const projectSelector = makeProjectSelector({ id: match.params.id });
  const boardSelector = makeBoardSelector({ boardId: match.params.boardId });
  return {
    board: boardSelector(state),
    project: projectSelector(state),
    loading: state.loading.effects['projects/fetchProject'],
  };
})
class BoardSelector extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'projects/fetchProject',
      payload: match.params.id,
    });
  }

  componentDidUpdate() {
    const { project, match } = this.props;
    const existsBoard = project.boards.find(b => b.id.toString() === match.params.boardId);

    // se o quadro não pertence
    // ao projeto, redirecione!
    if (!existsBoard) {
      router.replace(`/projects/${match.params.id}`);
    }
  }

  render() {
    const { board, project, loading, match } = this.props;

    if (!board || !project) {
      return <PageLoading />;
    }

    const boardsMenu = (
      <Menu selectable>
        {project.boards.map(r => (
          <Menu.Item key={r.id}>
            <Link to={`/projects/${match.params.id}/boards/${r.id}`}>{r.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <div className={styles.container}>
        <div className={styles.pageHeaderContent}>
          <div className={styles.boardSelector}>
            <Input.Group compact>
              <Dropdown overlay={boardOptionsMenu} placement="bottomRight">
                <Button>
                  <Icon type="ellipsis" />
                </Button>
              </Dropdown>
              <Dropdown overlay={boardsMenu} disabled={loading}>
                <Button>
                  <Icon type="project" className={styles.boardIcon} />
                  <span>
                    {'Quadro: '} <b>{board.name}</b>
                  </span>
                  <Icon type="down" />
                </Button>
              </Dropdown>
            </Input.Group>
          </div>
        </div>

        <Board boardId={board.id} />
      </div>
    );
  }
}

export default BoardSelector;
