import React, { PureComponent } from 'react';
import { Button, Form, Input } from 'antd';
import { formatMessage } from 'umi/locale';

class CommentForm extends PureComponent {
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
        <Form.Item {...formItemLayout} label={formatMessage({ id: 'app.card.labeluser' })}>
          {getFieldDecorator('message', {
            initialValue: current.message,
          })(
            <Input.TextArea
              placeholder={formatMessage({ id: 'app.card.commentpalceholder' })}
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          )}
        </Form.Item>
        <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            {formatMessage({ id: current.id ? 'app.comment.edit' : 'app.comment.new' })}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default CommentForm;
