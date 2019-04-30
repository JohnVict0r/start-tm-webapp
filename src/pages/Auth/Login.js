import React, { Component } from 'react';
import { Button, Card, Divider} from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import Login from '@/components/Login';
import OAuthButton from '@/components/OAuthButton';
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
          <Divider>OU</Divider>
          <OAuthButton
            authorizeUrl="https://login.sabia.ufrn.br/oauth/authorize/"
            clientId={SABIA_CLIENT_ID} // eslint-disable-line no-undef
            redirectUri={SABIA_REDIRECT_URI} // eslint-disable-line no-undef
            render={({ url }) => (
              <Button
                className={styles.sabia}
                href={url}
                type="primary"
                htmlType="submit"
                size="large"
                block
              >
                <img src='https://assets.sabia.ufrn.br/static/images/sabia.png' alt='Login com Sabiá' />
                Login com Sabiá
              </Button>
            )}
          />
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
