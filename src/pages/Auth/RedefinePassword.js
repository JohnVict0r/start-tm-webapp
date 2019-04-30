import React, { Component } from 'react';
import { connect } from 'dva';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { Button, Card, Form, Input } from 'antd';
import Logo from '@/components/Logo';
import PasswordForce from '@/components/PasswordForce';

import styles from './RedefinePassword.less';

@connect(({ resetPassword, loading }) => ({
  resetPassword,
  submitting: loading.effects['resetPassword/resetPasswordWithToken'],
}))
@Form.create()
class RedefinePassword extends Component {
  static defaultProps = {
    submitting: false,
  };

  state = {
    confirmDirty: false,
    help: '',
  };

  componentDidUpdate(prevProps) {
    const { form, register } = this.props;

    if (prevProps.register !== register && register.error) {
      const { errors } = register.error;

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
    const { form, match } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        const { token } = match.params;
        dispatch({
          type: 'resetPassword/resetPasswordWithToken',
          payload: {
            ...values,
            token,
          },
        });
        form.resetFields();
      }
    });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'validation.password.twice' }));
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage({ id: 'validation.password.required' }),
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['passwordConfirmation'], { force: true });
        }
        callback();
      }
    }
  };

  render() {
    const { form, submitting, resetPassword } = this.props;
    const { getFieldDecorator } = form;
    const { help } = this.state;
    const errorMessage = !!resetPassword.error && {
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
                <Input size="large" placeholder={formatMessage({ id: 'form.email.placeholder' })} />
              )}
            </Form.Item>
            <Form.Item help={help}>
              <PasswordForce form={form}>
                {getFieldDecorator('password', {
                  rules: [{ validator: this.checkPassword }],
                })(
                  <Input
                    size="large"
                    type="password"
                    placeholder={formatMessage({ id: 'form.password.placeholder' })}
                  />
                )}
              </PasswordForce>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('passwordConfirmation', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.confirm-password.required' }),
                  },
                  { validator: this.checkConfirm },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({ id: 'form.confirm-password.placeholder' })}
                />
              )}
            </Form.Item>
            <Button block loading={submitting} type="primary" htmlType="submit">
              <FormattedMessage id="app.register.send" />
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default RedefinePassword;
