import React, { PureComponent } from 'react';
import { connect } from 'dva';
import CardForm from '@/components/Form/Card';
import { Card, Form } from 'antd';
import { usersSelector } from '@/selectors/search';

@connect((state, ownProps) => ({
  validation: state.createBoard.validation,
  card: state.entities.cards[ownProps.match.params.cardId],
  submitting: state.loading.effects['saveCard/save'],
  users: usersSelector(state),
  loading: state.loading.effects['search/searchUserInProject'],
}))
@Form.create()
class EditCard extends PureComponent {
  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate(prevProps) {
    const { form, validation } = this.props;

    if (prevProps.validation !== validation) {
      const { errors } = validation;
      const mapErrors = Object.keys(errors).reduce(
        (accum, key) => ({
          ...accum,
          [key]: {
            value: form.getFieldValue(key),
            errors: errors[key].map(err => new Error(err)),
          },
        }),
        {}
      );

      form.setFields(mapErrors);
    }
  }

  fetchUser = value => {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'search/searchUserInProject',
      payload: {
        id: match.params.projectId,
        query: value,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form,
      dispatch,
      card,
      location: { state },
      match,
    } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        values.members.map(r => {
          if (card.members.indexOf(r) < 0) {
            dispatch({
              type: 'saveCard/assigin',
              payload: {
                id: card.id,
                userId: r,
              },
            });
          }
          return false;
        });
        card.members.map(r => {
          if (values.members.indexOf(r) < 0) {
            dispatch({
              type: 'saveCard/unAssigin',
              payload: {
                id: card.id,
                userId: r,
              },
            });
          }
          return false;
        });
        dispatch({
          type: 'saveCard/save',
          payload: {
            id: card.id,
            boardId: state.board.id,
            projectId: match.params.projectId,
            card: { ...values },
          },
        });
      }
    });
  };

  render() {
    const {
      form,
      submitting,
      card,
      users,
      match,
      location: { state },
      loading,
    } = this.props;

    return (
      <Card bordered={false} title="Editar tarefa">
        <CardForm
          form={form}
          onSubmit={this.handleSubmit}
          users={users}
          loading={loading}
          current={card}
          back={{
            pathname: `/projects/${match.params.projectId}/boards/${state.board.id}/cards/${
              match.params.cardId
            }`,
            state: { board: state.board },
          }}
          submiting={submitting}
        />
      </Card>
    );
  }
}

export default EditCard;
