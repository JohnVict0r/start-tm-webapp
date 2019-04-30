import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Alert, Form, Icon, Input } from 'antd';
import classNames from 'classnames';
import LoginSubmit from './LoginSubmit';
import styles from './index.less';

class Login extends Component {
  static propTypes = {
    login: PropTypes.shape({
      isLoggedIn: PropTypes.bool,
    }),
    submitting: PropTypes.bool,
    className: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    login: {
      isLoggedIn: undefined,
    },
    submitting: false,
    className: '',
    onSubmit: () => {},
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      onSubmit(err, values);
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { className, submitting, login, form, onSubmit } = this.props;
    const { getFieldDecorator, validateFields } = form;

    return (
      <div className={classNames(className, styles.login)}>
        <Form onSubmit={this.handleSubmit}>
          {login.isLoggedIn !== undefined &&
            !login.isLoggedIn &&
            !submitting &&
            this.renderMessage('Email ou senha inválidos.')}

          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: formatMessage({ id: 'validation.email.required' }) },
                { type: 'email', message: formatMessage({ id: 'validation.email.wrong-format' }) },
              ],
            })(
              <Input
                size="large"
                prefix={<Icon type="mail" className={styles.prefixIcon} />}
                name="email"
                placeholder="Email"
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Insira a senha!' }],
            })(
              <Input
                size="large"
                type="password"
                prefix={<Icon type="lock" className={styles.prefixIcon} />}
                name="password"
                placeholder="Senha"
                onPressEnter={() => validateFields(onSubmit)}
              />
            )}
          </Form.Item>

          <LoginSubmit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </LoginSubmit>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
