import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import { Card, Form } from 'antd';
import CardForm from '@/components/Form/Card';
import { boardUsersSelector } from '@/selectors/board';

@connect((state, ownProps) => ({
  validation: state.createBoard.validation,
  cardList: state.entities.cardlists[ownProps.match.params.cardlistId],
  submitting: state.loading.effects['saveCard/save'],
  users: boardUsersSelector(state),
}))
@Form.create()
class NewCard extends PureComponent {
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
    const { form, cardList, dispatch, match } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'saveCard/save',
          payload: {
            cardListId: cardList.id,
            boardId: match.params.boardId,
            projectId: match.params.projectId,
            card: { ...values },
          },
        });
      }
    });
  };

  render() {
    const { form, cardList, submitting, match, users } = this.props;

    return (
      <Card bordered={false} title={formatMessage({ id: 'app.card.new' })}>
        <p
          style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.85)', marginBottom: 16, fontWeight: 500 }}
        >
          {cardList.name}
        </p>
        <CardForm
          form={form}
          users={users}
          back={`/projects/${match.params.projectId}/boards/${match.params.boardId}`}
          onSubmit={this.handleSubmit}
          submiting={submitting}
        />
      </Card>
    );
  }
}

export default NewCard;
