import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'umi/locale';
import { Popover, Progress } from 'antd';
import styles from './index.less';

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="validation.password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="validation.password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="validation.password.strength.short" />
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

class PasswordForce extends Component {
  static propTypes = {
    // form: Form.propTypes.isRequired,
    fieldName: PropTypes.string,
  };

  static defaultProps = {
    fieldName: 'password',
  };

  getPasswordStatus = () => {
    const { form, fieldName } = this.props;
    const value = form.getFieldValue(fieldName);
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { children } = this.props;
    return (
      <Popover
        getPopupContainer={node => node.parentNode}
        content={
          <div style={{ padding: '4px 0' }}>
            {passwordStatusMap[this.getPasswordStatus()]}
            {this.renderPasswordProgress()}
            <div style={{ marginTop: 10 }}>
              <FormattedMessage id="validation.password.strength.msg" />
            </div>
          </div>
        }
        overlayStyle={{ width: 240 }}
        arrowPointAtCenter
        trigger="focus"
      >
        {children}
      </Popover>
    );
  }
}

export default PasswordForce;
