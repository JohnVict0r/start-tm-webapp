import React, { Component } from 'react';
import { connect } from 'dva';
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
    const { board, children } = this.props;

    if (!board) {
      return <PageLoading />;
    }

    return (
      <PageHeaderWrapper
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        title={`${board.project.name} > ${board.name}`}
        // action={action}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default BoardView;
