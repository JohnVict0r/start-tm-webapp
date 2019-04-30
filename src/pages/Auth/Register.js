import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { FormattedMessage } from 'umi/locale';
import Register from '@/components/Register';
import Logo from '@/components/Logo';
import styles from './Register.less';

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
class RegisterPage extends Component {
  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'register/submit',
        payload: values,
      });
    }
  };

  render() {
    const { register, submitting } = this.props;
    return (
      <div className={styles.main}>
        <Card>
          <Logo />
          <h3>
            <FormattedMessage id="app.register.register" />
          </h3>
          <Register submitting={submitting} register={register} onSubmit={this.handleSubmit} />
        </Card>
      </div>
    );
  }
}

export default RegisterPage;
