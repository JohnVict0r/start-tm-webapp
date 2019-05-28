import React, { Component } from 'react';
import { connect } from 'dva';
import { FormattedMessage, formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { Button, Card, Form, Input, Alert } from 'antd';
import Logo from '@/components/Logo';

import styles from './ForgotPassword.less';

@connect(({ forgotPassword, loading }) => ({
  forgotPassword,
  submitting: loading.effects['forgotPassword/forgot'],
}))
@Form.create()
class ForgotPassword extends Component {
  state = { emailSent: null };

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'forgotPassword/resetState',
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;

        dispatch({
          type: 'forgotPassword/forgot',
          payload: values,
        });
        this.setState({ emailSent: form.getFieldValue('email') });
        form.resetFields();
      }
    });
  };

  render() {
    const { form, submitting, forgotPassword } = this.props;
    const { getFieldDecorator } = form;
    const { emailSent } = this.state;

    if (forgotPassword.sentToken) {
      return (
        <div className={styles.main}>
          <Card>
            <Logo />
            <h3>
              <FormattedMessage id="app.register.mailrecover" />
            </h3>
            <Alert
              message={formatMessage({ id: 'app.register.mailsend' }, { email: emailSent })}
              type="success"
            />
            <Link className={styles.login} to="/auth/credentials">
              <FormattedMessage id="app.login.backlogin" />
            </Link>
          </Card>
        </div>
      );
    }

    const errorMessage = !!forgotPassword.error && {
      help: formatMessage({ id: 'validation.email.mailnotfound' }),
      validateStatus: 'error',
    };

    return (
      <div className={styles.main}>
        <Card>
          <Logo />
          <h3>
            <FormattedMessage id="app.register.mailrecover" />
          </h3>
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
                  maxLength={255}
                  placeholder={formatMessage({ id: 'form.email.recoverplaceholder' })}
                />
              )}
            </Form.Item>
            <Button loading={submitting} className={styles.submit} type="primary" htmlType="submit">
              <FormattedMessage id="app.register.send" />
            </Button>
            <Link className={styles.login} to="/auth/login">
              <FormattedMessage id="app.login.backlogin" />
            </Link>
          </Form>
        </Card>
      </div>
    );
  }
}

export default ForgotPassword;
