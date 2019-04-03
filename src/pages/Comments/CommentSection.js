import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Avatar, Button, Comment, Form, Input, List, Skeleton } from 'antd';
import { loggedInUserSelector } from '@/selectors/global';
import { commentsSelector } from './selectors/comments';

@connect((state) => {
  return {
    validation: state.comments.validation,
    comments: commentsSelector(state),
    loggedInUser: loggedInUserSelector(state),
    submitting: state.loading.effects['comments/save'],
    loading: state.loading.effects['comments/fetchComments'],
  };
})
@Form.create()
class CommentSection extends PureComponent {

  componentDidMount() {
    const { dispatch, commentableType, commentableId } = this.props;
    dispatch({
      type: 'comments/fetchComments',
      payload: {
        commentableType,
        commentableId,
      },
    });
  }

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
    const { form, commentableType, commentableId, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'comments/save',
          payload: {
            commentableType,
            commentableId,
            comment: { ...values },
          },
        });
      }
    });
    form.resetFields();
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
      loading,
      comments,
      loggedInUser,
    } = this.props;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Comment
            avatar={<Avatar src={loggedInUser.pictureUrl} />}
            content={
              <div>
                <Form.Item>
                  {getFieldDecorator('message', {
                    rules: [{ required: true }],
                  })(<Input.TextArea />)}
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" loading={submitting} type="primary">
                    Enviar
                  </Button>
                </Form.Item>
              </div>
            }
          />
        </Form>

        <List
          itemLayout="horizontal"
          loading={loading}
          dataSource={comments}
          renderItem={item => (
            <Skeleton loading={loading} active avatar>
              <Comment
                author={item.commented.name}
                avatar={<Avatar src={item.commented.pictureUrl} />}
                content={item.comment}
                datetime={moment(item.createdAt.date).format('LLL')}
              />
            </Skeleton>
          )}
        />
      </div>
    );
  }
}

export default CommentSection;
