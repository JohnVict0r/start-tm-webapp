import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';
import { Scrollbars } from 'react-custom-scrollbars';
import { makeBoardSelector } from './selectors/projects';
import PageLoading from '@/components/PageLoading';
import CardList from '@/components/CardList';
import { reorderCardMap } from '@/utils/reorder';
import styles from './Board.less';

const resetDisabledCardlists = (cardlists, value) =>
  cardlists.reduce(
    (prev, cl) => ({
      ...prev,
      [cl.id]: value,
    }),
    {}
  );

@connect((state, ownProps) => {
  const boardSelector = makeBoardSelector({ boardId: ownProps.match.params.boardId });
  return {
    board: boardSelector(state),
    loading: state.loading.effects['boards/fetchBoard'],
  };
})
class Board extends PureComponent {
  // tmpCardMap é necessário pois cardMap é alterado
  // tanto por novas props como com o setState
  state = {
    tmpCardMap: [],
    cardMap: [],
    cardlists: [],
    disabledCardlists: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.board) {
      let newState = {};

      if (nextProps.board.cardMap !== prevState.tmpCardMap) {
        newState = {
          ...newState,
          tmpCardMap: nextProps.board.cardMap,
          cardMap: nextProps.board.cardMap,
        };
      }

      if (nextProps.board.cardlists !== prevState.cardlists) {
        newState = {
          ...newState,
          cardlists: nextProps.board.cardlists,
          disabledCardlists: resetDisabledCardlists(nextProps.board.cardlists, false),
        };
      }

      return newState;
    }

    return null;
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'boards/fetchBoard',
      payload: match.params.boardId,
    });
  }

  onDragStart = start => {
    const {
      type,
      source: { droppableId },
    } = start;

    if (type === 'CARD') {
      const { cardlists } = this.state;
      const { board } = this.props;

      /*
       * transições possíveis a partir do cardlist `source.droppableId`
       */
      const possibleTransitions = board.transitions
        .filter(t => t.outCardListId.toString() === droppableId)
        .map(t => t.inCardListId);

      /*
       * o cardlist source também deve ser uma transição possível
       */
      possibleTransitions.push(droppableId);

      /*
       * desabilita todos os cardlists que não podem
       * ser transicionados a partir de `source.droppableId`
       */
      const disabledCardlists = possibleTransitions.reduce(
        (prev, transition) => ({
          ...prev,
          [transition]: false,
        }),
        resetDisabledCardlists(cardlists, true)
      );

      this.setState({ disabledCardlists });
    }
  };

  onDragEnd = result => {
    const { dispatch } = this.props;
    const { cardMap, cardlists } = this.state;

    this.setState({
      disabledCardlists: resetDisabledCardlists(cardlists),
    });

    // soltou fora da lista
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // sem movimento
    if (source.droppableId === destination.droppableId && destination.index === source.index) {
      return;
    }

    // reordena local
    const data = reorderCardMap({
      cardMap,
      source,
      destination,
    });

    // reordena no backend
    dispatch({
      type: 'cards/moveCard',
      payload: {
        cardId: cardMap[source.droppableId][source.index].id,
        fromCardListId: source.droppableId,
        toCardListId: destination.droppableId,
        position: destination.index,
      },
    });

    this.setState({
      cardMap: data.cardMap,
      disabledCardlists: resetDisabledCardlists(cardlists),
    });
  };

  render() {
    const { board, loading, match } = this.props;
    const { cardMap, disabledCardlists } = this.state;

    if (!board) {
      return <PageLoading />;
    }

    return (
      <div className={styles.container}>
        <Spin spinning={loading}>
          <Scrollbars className={styles.scroll}>
            <div className={styles.board}>
              <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                {board.cardlists.map(cardlist => (
                  <CardList
                    key={cardlist.id}
                    cardList={cardlist}
                    board={board}
                    projectid={match.params.id}
                    createCard={this.createCard}
                    isDisabled={disabledCardlists[cardlist.id]}
                    items={cardMap[cardlist.id]}
                  />
                ))}
              </DragDropContext>
            </div>
          </Scrollbars>
        </Spin>
      </div>
    );
  }
}

export default Board;
