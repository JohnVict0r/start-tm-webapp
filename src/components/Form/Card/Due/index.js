import React, { PureComponent } from 'react';
import { Button, DatePicker, Form } from 'antd';
import moment from 'moment';

@Form.create()
class DueForm extends PureComponent {
  static defaultProps = {
    current: {},
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
      current,
      onSubmit,
    } = this.props;

    const formItemLayout = {
      wrapperCol: {
        span: 24,
      },
    };

    return (
      <Form onSubmit={onSubmit}>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator('due', {
            rules: [{ message: 'Por favor informe o prazo do card!' }],
            initialValue: current.due ? moment(current.due) : null,
          })(<DatePicker showTime format="DD/MM/YYYY HH:mm:ss" />)}
        </Form.Item>
        <Form.Item {...formItemLayout}>
          <Button block type="primary" htmlType="submit" loading={submitting}>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default DueForm;
