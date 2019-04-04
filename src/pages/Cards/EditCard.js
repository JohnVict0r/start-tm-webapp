import React, { PureComponent } from 'react';
import { connect } from 'dva';
import CardForm from '@/components/Form/Card';
import { Card, Form } from 'antd';

@connect((state, ownProps) => ({
  validation: state.saveCard.validation,
  card: state.entities.cards[ownProps.match.params.cardId],
  submitting: state.loading.effects['saveCard/save'],
}))
@Form.create()
class EditCard extends PureComponent {
  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch, card} = this.props;
      dispatch({
        type: 'saveCard/save',
        payload: {
          id: card.id,
          card: { ...values },
        },
      });
    }
  };

  render() {
    const {
      form,
      submitting,
      card,
      history,
      validation
    } = this.props;

    return (
      <Card bordered={false} title="Editar tarefa">
        <CardForm
          form={form}
          onSubmit={this.handleSubmit}
          current={card}
          back={() => history.goBack()}
          submitting={submitting}
          validation={validation}
        />
      </Card>
    );
  }
}

export default EditCard;
