import React, { PureComponent } from 'react';
import { Avatar, Button, Comment, Form, Input } from 'antd';
import { formatMessage } from 'umi/locale';

class CommentForm extends PureComponent {
  static defaultProps = {
    current: {},
  };

  render() {
    const {
      submitting,
      current,
      onSubmit,
      user,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={onSubmit}>
        <Comment
          avatar={<Avatar src={user.pictureUrl} />}
          content={
            <div>
              <Form.Item>
                {getFieldDecorator('message', {
                  initialValue: current.message,
                })(<Input.TextArea />)}
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" loading={submitting} type="primary">
                  {formatMessage({ id: current.id ? 'app.comment.edit' : 'app.comment.new' })}
                </Button>
              </Form.Item>
            </div>
          }
        />
      </Form>
    );
  }
}

export default CommentForm;
