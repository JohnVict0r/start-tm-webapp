import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import CardForm from '@/components/Form/Card';

@connect(state => ({
  validation: state.saveCard.validation,
  submitting: state.loading.effects['saveCard/save'],
}))
class NewCard extends PureComponent {
  handleSubmit = (err, values) => {
    if (!err) {
      const { location: { state }, dispatch } = this.props;
      dispatch({
        type: 'saveCard/save',
        payload: {
          cardListId: state.cardList.id,
          card: { ...values },
        },
      });
    }
  };

  render() {
    const {
      submitting,
      location: { state },
      history,
      validation,
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
          <Form.Item label="Lista" {...formItemLayout}>
            <span className="ant-form-text">{state.cardList.name}</span>
          </Form.Item>
        </Form>
        <CardForm
          back={() => history.goBack()}
          onSubmit={this.handleSubmit}
          submitting={submitting}
          validation={validation}
        />
      </Card>
    );
  }
}

export default NewCard;
