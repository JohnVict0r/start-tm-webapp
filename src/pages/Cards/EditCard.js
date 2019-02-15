import React, { PureComponent } from 'react';
import { connect } from 'dva';
import CardForm from '@/components/Form/Card';
import { Card, Form } from 'antd';
import { boardUsersSelector } from '@/selectors/board';

@connect((state, ownProps) => ({
  validation: state.createBoard.validation,
  card: state.entities.cards[ownProps.match.params.cardId],
  submitting: state.loading.effects['saveCard/save'],
  users: boardUsersSelector(state),
}))
@Form.create()
class EditCard extends PureComponent {
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

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch, card } = this.props;
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
            card: { ...values },
          },
        });
      }
    });
  };

  render() {
    const { form, submitting, card, users } = this.props;

    return (
      <Card bordered={false} title="Editar tarefa">
        <CardForm
          form={form}
          onSubmit={this.handleSubmit}
          users={users}
          current={card}
          submiting={submitting}
        />
      </Card>
    );
  }
}

export default EditCard;