import React, { PureComponent } from 'react';
import { Button, DatePicker, Form, Input, Select, Spin } from 'antd';
import moment from 'moment';
import { priorities } from '@/utils/labels';

class CardForm extends PureComponent {
  static defaultProps = {
    current: {},
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
      current,
      onSubmit,
      users,
      back,
      loading,
      handleChange,
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
      <Form onSubmit={onSubmit} hideRequiredMark>
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
        <Form.Item {...formItemLayout} label="Prioridade">
          {getFieldDecorator('priority', {
            rules: [{ required: true, message: 'Qual a prioridade para a tarefa?' }],
            initialValue: current.priority,
          })(
            <Select placeholder="Selecione uma prioridade">
              {priorities.map(r => (
                <Select.Option value={r.value} key={r.value}>
                  {r.label}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Participantes">
          {getFieldDecorator('assigned_users', {
            initialValue: current.members,
          })(
            <Select
              optionFilterProp="search"
              mode="multiple"
              notFoundContent={loading ? <Spin size="small" /> : null}
              placeholder="Usuários participantes da tarefa"
              onSearch={handleChange}
            >
              {users.map(r => (
                <Select.Option key={r.id} value={r.id} search={r.name}>
                  {r.name}
                </Select.Option>
              ))}
            </Select>
          )}
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
