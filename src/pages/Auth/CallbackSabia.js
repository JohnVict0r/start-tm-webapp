import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import Logo from '@/components/Logo';
import PageLoading from '@/components/PageLoading';

import styles from './CallbackSabia.less'

@connect(({ loading }) => ({
  loading: loading.effects['login/loginWithSabia'],
}))
class CallbackSabia extends Component {
  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'login/loginWithSabia',
      payload: location.query,
    });
  }

  render() {
    return (
      <div className={styles.main}>
        <Card>
          <Logo />
          <PageLoading />
        </Card>
      </div>
    );
  }
}

export default CallbackSabia;
