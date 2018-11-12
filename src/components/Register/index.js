import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import classNames from 'classnames';
import { Form, Input, Button } from 'antd';
import PasswordForce from '../PasswordForce';

import styles from './index.less';

class Register extends Component {
  static propTypes = {
    // register: PropTypes.shape({
    //   error: PropTypes.
    // })
    submitting: PropTypes.bool,
    className: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    // register: {
    //   error: undefined,
    // },
    submitting: false,
    className: '',
    onSubmit: () => {},
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
    const { form, onSubmit } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      onSubmit(err, values);
    });
  };

  // handleConfirmBlur = e => {
  //   const { value } = e.target;
  //   const { confirmDirty } = this.state;
  //   this.setState({ confirmDirty: confirmDirty || !!value });
  // };

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

  render() {
    const { form, submitting, className } = this.props;
    const { getFieldDecorator } = form;
    const { help } = this.state;
    return (
      <div className={classNames(className, styles.main)}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: formatMessage({ id: 'validation.name.required' }) },
              ],
            })(
              <Input
                size="large"
                name="name"
                placeholder={formatMessage({ id: 'form.user-name.placeholder' })}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: formatMessage({ id: 'validation.email.required' }) },
                { type: 'email', message: formatMessage({ id: 'validation.email.wrong-format' }) },
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
            {getFieldDecorator('password_confirmation', {
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
          <Form.Item>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="app.register.register" />
            </Button>
            <Link className={styles.login} to="/User/Login">
              <FormattedMessage id="app.register.sing-in" />
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Register);
