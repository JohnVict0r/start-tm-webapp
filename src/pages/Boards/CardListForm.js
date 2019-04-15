import React, { Component } from 'react';
import { Checkbox, Form, Input, Select } from 'antd';
import { formatMessage } from 'umi/locale';

@Form.create()
class CardListForm extends Component {
  render() {
    const {
      form: { getFieldDecorator },
      status,
      initialValues,
      className
    } = this.props;

    return (
      <Form
        layout="vertical"
        className={className}
      >
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: formatMessage({ id: 'app.workflow.form.node.name-message' }) },
            ],
            initialValue: initialValues.name,
          })(
            <Input
              autoFocus
              maxLength={50}
              placeholder={formatMessage({ id: 'app.workflow.form.node.name' })}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('status_id', {
            rules: [
              { required: true, message: formatMessage({ id: 'app.workflow.form.node.status-message' }) },
            ],
            initialValue: initialValues.status && initialValues.status.id,
          })(
            <Select
              placeholder={formatMessage({ id: 'app.workflow.form.node.status' })}
            >
              {status.map(s => (
                <Select.Option value={s.id} key={s.id}>
                  {s.displayName}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('can_create_card', {
            initialValue: initialValues.canCreateCard,
            valuePropName: 'checked',
          })(<Checkbox>{formatMessage({ id: 'app.workflow.form.node.check' })}</Checkbox>)}
        </Form.Item>
      </Form>
    );
  }
}

export default CardListForm;
