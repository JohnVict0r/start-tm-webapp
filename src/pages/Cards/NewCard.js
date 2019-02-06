import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import CardForm from '@/components/Form/Card';
import { boardUsersSelector } from '@/selectors/board';

@connect(state => ({
  validation: state.createBoard.validation,
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
    const {
      form,
      location: { state },
      dispatch,
      match,
    } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'saveCard/save',
          payload: {
            cardListId: state.cardList.id,
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
      users,
      location: { state },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    return (
      <Card bordered={false} title="Nova tarefa">
        <Form>
          <Form.Item label="Quadro" {...formItemLayout}>
            <span className="ant-form-text">{`${state.board.name} > ${state.cardList.name}`}</span>
          </Form.Item>
        </Form>
        <CardForm form={form} users={users} onSubmit={this.handleSubmit} submiting={submitting} />
      </Card>
    );
  }
}

export default NewCard;
