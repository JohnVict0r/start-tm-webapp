import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { Button, Dropdown, Icon, Menu } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';

import { makeBoardSelector } from './selectors/boards';


@connect((state, ownProps) => {
  const boardSelector = makeBoardSelector({ id: ownProps.match.params.boardId });
  return {
    board: boardSelector(state),
    loading: state.loading.effects['boards/fetchBoard'],
  };
})
class BoardView extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'boards/fetchBoard',
      payload: match.params.boardId,
    });
  }

  render() {
    const { board, children, match } = this.props;

    if (!board) {
      return <PageLoading />;
    }

    const boardOptionsMenu = (
      <Menu>
        <Menu.Item key="1">
          <Link to={`${match.url}/milestones`}>Entregáveis</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <Link to={`${match.url}/edit`}>Editar Quadro</Link>
        </Menu.Item>
      </Menu>
    );

    const action = (
      <div>
        {/* <FavoriteIcon
          style={{ padding: '0 8px' }}
          onClick={this.handleFavorite}
          favorited={project.favorited}
        /> */}
        <Button.Group>
          <Button onClick={() => router.push(`${match.url}/members`)}>Membros</Button>
          <Dropdown overlay={boardOptionsMenu} placement="bottomRight">
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
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        title={(
          <span>
            <Link to={`/projects/${board.project.id}`}>{board.project.name}</Link>
            <span style={{ fontWeight: '300' }}>{' > '}</span>
            {board.name}
          </span>
        )}
        action={action}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default BoardView;
