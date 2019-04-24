import React, { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'dva';
import { Icon, Spin } from 'antd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import PageLoading from '@/components/PageLoading';
import ColumnList from '@/components/ColumnList';
import { reorder, reorderCardMap } from '@/utils/reorder';

import CardList from './CardList';
import SaveCardList from './SaveCardList';
import { boardSelector } from './selectors/boards';
import styles from './Board.less';

const resetDisabledCardlists = (cardlists, value) =>
  cardlists.reduce(
    (prev, cl) => ({
      ...prev,
      [cl.id]: value,
    }),
    {}
  );

@connect(state => ({
  board: boardSelector(state),
  loading: state.loading.effects['boards/fetchBoard'],
}))
class Board extends PureComponent {
  state = {
    showNewCardListForm: false,
    cardMap: [],
    cardlists: [],
    disabledCardlists: [],
  };

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'boards/fetchBoard',
      payload: match.params.teamId,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { board } = this.props;
    if (board) {
      if (!isEqual(board.cardMap, prevState.cardMap)) {
        // eslint-disable-next-line
        this.setState({
          cardMap: board.cardMap,
        });
      }

      if (!isEqual(board.cardlists, prevState.cardlists)) {
        // eslint-disable-next-line
        this.setState({
          cardlists: board.cardlists,
          disabledCardlists: resetDisabledCardlists(board.cardlists, false),
        });
      }
    }
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
       * transições não permitidas a partir do cardlist `source.droppableId`
       */
      const sourceCardList = board.cardlists.find(c => c.id.toString() === droppableId);
      const disabledTransitions = sourceCardList.disabledTransitions.map(c => c.disabledCardListId);

      /*
       * desabilita todos os cardlists que não podem
       * ser transicionados a partir de `source.droppableId`
       */
      const disabledCardlists = disabledTransitions.reduce(
        (prev, transition) => ({
          ...prev,
          [transition]: true,
        }),
        resetDisabledCardlists(cardlists, false)
      );

      this.setState({ disabledCardlists });
    }
  };

  onDragEnd = result => {
    const { dispatch, match } = this.props;
    const { cardMap, cardlists } = this.state;

    if (result.type === 'CARD') {
      this.setState({
        disabledCardlists: resetDisabledCardlists(cardlists),
      });
    }

    // soltou fora da lista
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // sem movimento
    if (source.droppableId === destination.droppableId && destination.index === source.index) {
      return;
    }

    // reordena lista
    if (result.type === 'LIST') {
      // reordena local
      const orderedCardlists = reorder(cardlists, source.index, destination.index);

      this.setState(
        {
          cardlists: orderedCardlists,
        },
        () => {
          // reordena no backend
          dispatch({
            type: 'boards/moveCardlist',
            payload: {
              teamId: match.params.teamId,
              cardlists: orderedCardlists.map(item => item.id),
            },
          });
        }
      );

      return;
    }

    // reordena local
    const data = reorderCardMap({
      cardMap,
      source,
      destination,
    });

    this.setState(
      {
        cardMap: data.cardMap,
        disabledCardlists: resetDisabledCardlists(cardlists),
      },
      () => {
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
      }
    );
  };

  render() {
    const { board, loading, children } = this.props;
    const { cardMap, cardlists, disabledCardlists, showNewCardListForm } = this.state;

    if (!board) {
      return <PageLoading />;
    }

    return (
      <div className={styles.container}>
        <Spin spinning={loading}>
          <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="LIST">
              {provided => (
                <div className={styles.board} ref={provided.innerRef} {...provided.droppableProps}>
                  {cardlists.map((cardList, index) => (
                    <CardList
                      key={cardList.id}
                      index={index}
                      board={board}
                      cardList={cardList}
                      items={cardMap[cardList.id]}
                      isDisabled={disabledCardlists[cardList.id]}
                    />
                  ))}

                  {provided.placeholder}

                  {showNewCardListForm ? (
                    <SaveCardList onClose={() => this.setState({ showNewCardListForm: false })} />
                  ) : (
                    <ColumnList>
                      <div className={styles.newCardListToogle}>
                        <div
                          className={styles.plusIcon}
                          onClick={() => this.setState({ showNewCardListForm: true })}
                        >
                          <Icon type="plus" />
                          <div>Nova Lista</div>
                        </div>
                      </div>
                    </ColumnList>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Spin>
        {children}
      </div>
    );
  }
}

export default Board;
