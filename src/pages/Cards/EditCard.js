import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import CardForm from '@/components/Form/Card';
import { Card, Form } from 'antd';

@connect((state, ownProps) => ({
  validation: state.createBoard.validation,
  cardList: state.entities.cardlists[ownProps.match.params.cardlistId],
  card: state.entities.cards[ownProps.match.params.id],
  submitting: state.loading.effects['saveCard/save'],
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
    const { form, cardList, dispatch,card,match } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'saveCard/save',
          payload: {
            id:card.id,
            cardListId: cardList.id,
            boardId:match.params.boardId,
            projectId:match.params.projectId,
            card: {...values },
          },
        });
      }
    });
  };

  render() {
    const {
      form,
      cardList,
      submitting,
      card
    } = this.props;

    return (
      <Card bordered={false} title={formatMessage({ id: 'app.card.new' })}>
        <p style={{fontSize: 14, color: 'rgba(0, 0, 0, 0.85)', marginBottom: 16, fontWeight: 500}}>
          {cardList.name}
        </p>
        <CardForm form={form} onSubmit={this.handleSubmit} current={card} submiting={submitting} />
      </Card>
    );
  }
}

export default EditCard;
