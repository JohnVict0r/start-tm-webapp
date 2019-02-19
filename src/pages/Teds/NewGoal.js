import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, InputNumber, Form, Card, Button, DatePicker } from 'antd';

@connect(state => ({
  submitting: state.loading.effects['saveGoal/save'],
}))
@Form.create()
class NewGoal extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch, match } = this.props;
        const [startline, deadline] = values.duration;
        dispatch({
          type: 'saveGoal/save',
          payload: {
            tedId: match.params.tedId,
            goal: {
              ...values,
              startline,
              deadline,
            },
          },
        });
        form.resetFields();
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
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

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <Card title="Nova Meta" bordered={false}>
        <Form style={{ marginTop: 8 }} onSubmit={this.handleSubmit} hideRequiredMark>
          <Form.Item label="Nome" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Por favor informe um nome!' }],
            })(<Input maxLength={255} placeholder="Insira o nome da meta" />)}
          </Form.Item>
          <Form.Item label="Prazos" {...formItemLayout}>
            {getFieldDecorator('duration', {
              rules: [{ required: true, message: 'Por favor informe os prazos!' }],
            })(<DatePicker.RangePicker format="DD/MM/YYYY" />)}
          </Form.Item>
          <Form.Item label="Peso" {...formItemLayout}>
            {getFieldDecorator('weight', {
              rules: [{ required: true, message: 'Por favor informe o peso!' }],
            })(<InputNumber min={1} max={100} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Descrição">
            {getFieldDecorator('description', {
              rules: [
                {
                  message: 'Por favor, insira uma descrição com pelo menos 5 caracteres',
                  min: 5,
                },
              ],
            })(
              <Input.TextArea
                maxLength={255}
                rows={4}
                placeholder="Por favor, forneça uma descrição"
              />
            )}
          </Form.Item>
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Criar Meta
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default NewGoal;
