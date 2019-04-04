import React, { PureComponent } from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import moment from 'moment';

@Form.create()
class CardForm extends PureComponent {
  static defaultProps = {
    current: {},
  };

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
    const { form, onSubmit } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      onSubmit(err, values);
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
      current,
      back,
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
      <Form onSubmit={this.handleSubmit} hideRequiredMark>
        <Form.Item label="Nome" {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Por favor informe o nome da tarefa!' }],
            initialValue: current.name,
          })(<Input maxLength={255} placeholder="Insira o nome da tarefa" />)}
        </Form.Item>
        <Form.Item label="Descrição" {...formItemLayout}>
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Por favor informe o descrição da tarefa!' }],
            initialValue: current.description,
          })(<Input.TextArea maxLength={255} placeholder="Insira a descricão da tarefa" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Data de entrega">
          {getFieldDecorator('due', {
            rules: [{ required: true, message: 'Por favor informe a data de entrega!' }],
            initialValue: current.due ? moment(current.due) : null,
          })(<DatePicker showTime format="DD/MM/YYYY HH:mm:ss" />)}
        </Form.Item>
        <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            {current.id ? 'Alterar tarefa' : 'Criar tarefa'}
          </Button>
          <Button onClick={back} style={{ marginLeft: 5 }} type="default" htmlType="button">
            Voltar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default CardForm;
