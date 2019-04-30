import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Button, Col, Row } from 'antd';
import AvatarUpload from '@/components/Upload/Avatar';
import { connect } from 'dva';
import { loggedInUserSelector } from '@/selectors/global';
import styles from './BasicInfo.less';

@connect(state => ({
  currentUser: loggedInUserSelector(state),
  submitting: state.loading.effects['user/updateUserInfo'],
}))
@Form.create()
class BasicInfo extends Component {
  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      form.setFieldsValue(obj);
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'user/updateUserInfo',
          payload: values,
        });
      }
    });
  };

  onUploadAvatar = file => {
    const { dispatch } = this.props;
    return dispatch({
      type: 'user/updateAvatar',
      payload: file,
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      currentUser,
      submitting,
    } = this.props;

    return (
      <Row gutter={16} className={styles.baseView}>
        <Col xl={12} lg={24}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <Form.Item label={formatMessage({ id: 'app.settings.basic.email' })}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: false,
                    message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                  },
                ],
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'app.settings.basic.name' })}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.name-message' }, {}),
                  },
                ],
              })(
                <Input
                  maxLength={255}
                  placeholder={formatMessage({ id: 'app.settings.basic.name-placeholder' })}
                />
              )}
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage
                id="app.settings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form>
        </Col>
        <Col xl={12} lg={24}>
          <div className={styles.right}>
            <div className={styles.avatar_title}>
              <FormattedMessage id="app.settings.basic.avatar" defaultMessage="Avatar" />
            </div>
            <AvatarUpload
              name="avatar"
              avatar={currentUser.avatar}
              onUpload={this.onUploadAvatar}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

export default BasicInfo;
