import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button, Input, Form } from 'antd';
import { connect } from 'dva';
import PasswordForce from '@/components/PasswordForce';

import styles from './ChangePassword.less';

@connect(state => ({
  updatePassword: state.user.updatePassword,
  submitting: state.loading.effects['user/updateUserPassword'],
}))
@Form.create()
class ChangePassword extends Component {
  state = {
    help: '',
  };

  componentDidUpdate(prevProps) {
    const { form, updatePassword } = this.props;

    if (prevProps.updatePassword !== updatePassword && updatePassword.error) {
      const { errors } = updatePassword.error;
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
          form.validateFields(['password_confirmation'], { force: true });
        }
        callback();
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'user/updateUserPassword',
          payload: values,
        });
        form.resetFields();
      }
    });
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { help } = this.state;

    const formItemLayout = {
      wrapperCol: {
        span: 10,
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} layout="vertical" hideRequiredMark>
        <Form.Item
          {...formItemLayout}
          label={formatMessage({ id: 'app.settings.basic.current-password' })}
        >
          {getFieldDecorator('currentPassword', {
            rules: [
              { required: true, message: formatMessage({ id: 'validation.password.required' }) },
            ],
          })(
            <Input
              type="password"
              placeholder={formatMessage({ id: 'form.oldpasssword.placeholder' })}
            />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          help={help}
          label={formatMessage({ id: 'app.settings.basic.newpassword' })}
        >
          <PasswordForce form={form}>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: formatMessage({ id: 'validation.password.required' }) },
                { validator: this.checkPassword },
              ],
            })(
              <Input
                type="password"
                placeholder={formatMessage({ id: 'form.password.placeholder' })}
              />
            )}
          </PasswordForce>
        </Form.Item>
        <Form.Item {...formItemLayout}>
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
              type="password"
              placeholder={formatMessage({ id: 'form.confirm-password.placeholder' })}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button loading={submitting} className={styles.submit} type="primary" htmlType="submit">
            <FormattedMessage id="app.register.register" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ChangePassword;
