import React, { PureComponent } from 'react';
import { connect } from 'dva';
import CardForm from '@/components/Form/Card';
import { Card } from 'antd';

@connect((state, ownProps) => ({
  validation: state.saveCard.validation,
  card: state.entities.cards[ownProps.match.params.cardId],
  submitting: state.loading.effects['saveCard/save'],
}))
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
      submitting,
      card,
      history,
      validation
    } = this.props;

    return (
      <Card bordered={false} title="Editar tarefa">
        <CardForm
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
