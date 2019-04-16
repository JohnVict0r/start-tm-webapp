import React, { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'dva';
import router from 'umi/router';
import {Icon, Spin} from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';
import PageLoading from '@/components/PageLoading';
import ColumnList from '@/components/ColumnList';
import { reorderCardMap } from '@/utils/reorder';

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
  loading: state.loading.effects['boards/fetchBoard']
}))
class Board extends PureComponent {
  // tmpCardMap é necessário pois cardMap é alterado
  // tanto por novas props como com o setState
  state = {
    showNewCardListForm: false,
    tmpCardMap: [],
    cardMap: [],
    cardlists: [],
    disabledCardlists: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.board) {
      let newState = {};

      if (!isEqual(nextProps.board.cardMap, prevState.tmpCardMap)) {
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
      payload: match.params.teamId,
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
       * transições não permitidas a partir do cardlist `source.droppableId`
       */
      const sourceCardList = board.cardlists.find(c => c.id.toString() === droppableId);
      const disabledTransitions = sourceCardList.disabledTransitions.map(c => c.disabledCardListId)

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
    const { cardMap, disabledCardlists, showNewCardListForm } = this.state;

    if (!board) {
      return <PageLoading />;
    }

    return (
      <div className={styles.container}>
        <Spin spinning={loading}>
          <div className={styles.board}>
            <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
              {board.cardlists.map(cardList => (
                <CardList
                  key={cardList.id}
                  board={board}
                  cardList={cardList}
                  isDisabled={disabledCardlists[cardList.id]}
                  items={cardMap[cardList.id]}
                />
              ))}
            </DragDropContext>
            {showNewCardListForm ? (
              <SaveCardList
                onClose={() => this.setState({ showNewCardListForm: false })}
              />
            ) : (
              <ColumnList>
                <div className={styles.newCardListToogle}>
                  <div
                    className={styles.plusIcon}
                    onClick={() => this.setState({ showNewCardListForm: true })}
                  >
                    <Icon type='plus' />
                    <div>Nova Lista</div>
                  </div>
                </div>
              </ColumnList>
            )}
          </div>
        </Spin>
        {children}
      </div>
    );
  }
}

export default Board;
