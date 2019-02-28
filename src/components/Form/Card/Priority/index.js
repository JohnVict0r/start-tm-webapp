import React, { PureComponent } from 'react';
import { Button, Form, Select } from 'antd';
import { formatMessage } from 'umi/locale';
import { priorities } from '@/utils/labels';

@Form.create()
class PriorityForm extends PureComponent {
  static defaultProps = {
    current: {},
  };

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
    } = this.props;

    const formItemLayout = {
      wrapperCol: {
        span: 24,
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator('priority', {
            rules: [{ required: true }],
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
