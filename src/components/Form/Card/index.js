import React, { PureComponent } from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import Link from 'umi/link';
import moment from 'moment';
import { formatMessage } from 'umi/locale';
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
      <Form onSubmit={onSubmit}>
        <Form.Item label={formatMessage({ id: 'app.card.labelname' })} {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Por favor informe o nome do card!' }],
            initialValue: current.name,
          })(<Input maxLength={255} placeholder="Insita o nome do quadro" />)}
        </Form.Item>
        <Form.Item label={formatMessage({ id: 'app.card.labeldescription' })} {...formItemLayout}>
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Por favor informe o descricao do card!' }],
            initialValue: current.description,
          })(<Input.TextArea maxLength={255} placeholder="Insita a descricão do card" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={formatMessage({ id: 'app.card.labeldue' })}>
          {getFieldDecorator('due', {
            rules: [{ required: true, message: 'Por favor informe o prazo do card!' }],
            initialValue: moment(current.due),
          })(<DatePicker locale="pt-br" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={formatMessage({ id: 'app.card.labelpriority' })}>
          {getFieldDecorator('priority', {
            rules: [{ required: true, message: 'Por favor informe uma prioridade para o card!' }],
            initialValue: current.priority,
          })(
            <Select placeholder={formatMessage({ id: 'app.card.labelpriority' })}>
              {priorities.map(r => (
                <Select.Option key={r.value}>{r.label}</Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={formatMessage({ id: 'app.card.labeluser' })}>
          {getFieldDecorator('members', {
            initialValue: current.members,
          })(
            <Select
              optionFilterProp="search"
              mode="multiple"
              placeholder={formatMessage({ id: 'app.card.labeluser' })}
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
            {formatMessage({ id: current.id ? 'app.card.edit' : 'app.card.new' })}
          </Button>
          <Button style={{ marginLeft: '12px' }} type="info" htmlType="button">
            <Link to={back}>{formatMessage({ id: 'app.card.back' })}</Link>
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default CardForm;
