import React, { PureComponent } from 'react';
import { Button, Form, Select } from 'antd';
import { formatMessage } from 'umi/locale';
import { priorities } from '@/utils/labels';

@Form.create()
class PriorityForm extends PureComponent {
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
        <Form.Item {...formItemLayout} label={formatMessage({ id: 'app.card.labelpriority' })}>
          {getFieldDecorator('priority', {
            initialValue: current.priority,
          })(
            <Select placeholder={formatMessage({ id: 'app.card.labelpriority' })}>
              {priorities.map(r => (
                <Select.Option value={r.value} key={r.value}>
                  {r.label}
                </Select.Option>
              ))}
            </Select>
          )}
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

export default PriorityForm;
