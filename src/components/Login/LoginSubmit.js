import React from 'react';
import classNames from 'classnames';
import { Button, Form } from 'antd';
import styles from './index.less';

const LoginSubmit = ({ className, ...rest }) => {
  const clsString = classNames(styles.submit, className);
  return (
    <Form.Item>
      <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />
    </Form.Item>
  );
};

export default LoginSubmit;
