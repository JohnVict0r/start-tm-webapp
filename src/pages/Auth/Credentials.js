import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import Login from '@/components/Login';
import Logo from '@/components/Logo';
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
        <Card>
          <Logo />
          <Login submitting={submitting} login={login} onSubmit={this.handleSubmit} />
          <div className={styles.forgot}>
            <Link to="/auth/forgot-password">Esqueceu a senha?</Link>
          </div>
        </Card>
        <Card style={{ textAlign: 'center', marginTop: '12px' }}>
          Não tem uma conta? <Link to="/auth/register">Cadastre-se</Link>
        </Card>
      </div>
    );
  }
}

export default LoginPage;
