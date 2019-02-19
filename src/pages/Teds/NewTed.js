import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Form, Card, Button, DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(state => ({
  submitting: state.loading.effects['saveTed/save'],
}))
@Form.create()
class NewTed extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        const [startline, deadline] = values.duration;
        dispatch({
          type: 'saveTed/save',
          payload: {
            values: {
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
      <PageHeaderWrapper title="Nova TED">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <Form.Item label="Nome da TED" {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Por favor informe um nome!' }],
              })(<Input maxLength={255} placeholder="Insira o nome da TED" />)}
            </Form.Item>
            <Form.Item label="Prazos" {...formItemLayout}>
              {getFieldDecorator('duration', {
                rules: [{ required: true, message: 'Por favor informe os prazos!' }],
              })(<DatePicker.RangePicker format="DD/MM/YYYY" />)}
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
                  placeholder="Por favor, forneça uma descrição para a TED"
                />
              )}
            </Form.Item>
            <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Criar TED
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NewTed;
