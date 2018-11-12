import React, { Component } from 'react';
import { connect } from 'dva';
import Login from '@/components/Login';
import styles from './Login.less';

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: values,
      });
    }
  };

  render() {
    const { login, submitting } = this.props;
    return (
      <div className={styles.main}>
        <Login submitting={submitting} login={login} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default LoginPage;
