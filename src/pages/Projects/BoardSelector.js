import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import Link from 'umi/link';
import { Input, Menu, Button, Dropdown, Icon } from 'antd';
import PageLoading from '@/components/PageLoading';
import { makeProjectSelector } from './selectors/projects';
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
  return {
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

  render() {
    const { project, loading, match } = this.props;

    if (!project) {
      return <PageLoading />;
    }

    const selectedBoard = project.boards.find(b => b.id.toString() === match.params.boardId);

    if (!selectedBoard) {
      return <Redirect to={`/projects/${match.params.id}`} />;
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
          <Link to={`/projects/${match.params.id}/boards/new`}>
            <Button type="primary" icon="plus">
              Quadro
            </Button>
          </Link>
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
                    {'Quadro: '} <b>{selectedBoard.name}</b>
                  </span>
                  <Icon type="down" />
                </Button>
              </Dropdown>
            </Input.Group>
          </div>
        </div>

        <Board boardId={selectedBoard.id} />
      </div>
    );
  }
}

export default BoardSelector;
