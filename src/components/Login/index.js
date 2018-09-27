import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'umi/link';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Alert, Checkbox, Form, Icon, Input } from 'antd';
import classNames from 'classnames';
import LoginSubmit from './LoginSubmit';
import styles from './index.less';

class Login extends Component {
  static propTypes = {
    // login: PropTypes.shape({
    //   status: PropTypes.
    // })
    submitting: PropTypes.bool,
    className: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    submitting: false,
    className: '',
    onSubmit: () => {},
  };

  state = {
    autoLogin: true,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      onSubmit(err, values);
    });
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { className, submitting, login, form, onSubmit } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const { autoLogin } = this.state;

    return (
      <div className={classNames(className, styles.login)}>
        <Form onSubmit={this.handleSubmit}>
          {login.status === 'error' &&
            !submitting &&
            this.renderMessage('账户或密码错误（admin/888888）')}

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

          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div>
          <LoginSubmit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </LoginSubmit>
          <div className={styles.other}>
            <FormattedMessage id="app.login.sign-in-with" />
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/User/Register">
              <FormattedMessage id="app.login.signup" />
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
