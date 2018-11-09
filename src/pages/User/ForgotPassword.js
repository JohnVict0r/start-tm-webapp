import React, { Component } from 'react';
import { connect } from 'dva';
import { FormattedMessage, formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { Button, Form, Input, Alert } from 'antd';
import styles from './ForgotPassword.less';

@connect(({ resetPassword, loading }) => ({
  resetPassword,
  submitting: loading.effects['resetPassword/forgot'],
}))
@Form.create()
class ForgotPassword extends Component {
  state = { sentmail: null };

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'resetPassword/resetState',
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;

        dispatch({
          type: 'resetPassword/forgot',
          payload: values,
        });
        this.setState({ sentmail: form.getFieldValue('email') });
        form.resetFields();
      }
    });
  };

  render() {
    const { form, submitting, resetPassword } = this.props;
    const { getFieldDecorator } = form;
    const { sentmail } = this.state;

    if (resetPassword.sentToken) {
      return (
        <div className={styles.main}>
          <h3>
            <FormattedMessage id="app.register.mailrecover" />
          </h3>
          <Alert
            message={formatMessage({ id: 'app.register.mailsend' }, { email: sentmail })}
            type="success"
          />
          <Link className={styles.login} to="/user/login">
            <FormattedMessage id="app.login.backlogin" />
          </Link>
        </div>
      );
    }

    const errorMessage = !!resetPassword.error && {
      help: 'Email já existente',
      validateStatus: 'error',
    };

    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="app.register.mailrecover" />
        </h3>
        <div className={styles.main}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...errorMessage}>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: formatMessage({ id: 'validation.email.required' }) },
                  {
                    type: 'email',
                    message: formatMessage({ id: 'validation.email.wrong-format' }),
                  },
                ],
              })(
                <Input
                  size="large"
                  placeholder={formatMessage({ id: 'form.email.recoverplaceholder' })}
                />
              )}
            </Form.Item>
            <Button loading={submitting} className={styles.submit} type="primary" htmlType="submit">
              <FormattedMessage id="app.register.send" />
            </Button>
            <Link className={styles.login} to="/User/Login">
              <FormattedMessage id="app.login.backlogin" />
            </Link>
          </Form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
