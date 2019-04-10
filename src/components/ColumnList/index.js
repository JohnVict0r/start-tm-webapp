import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const ColumnList = ({ children, isDisabled, className, ...rest }) => (
  <div
    className={classNames(className, styles.column, {
      [styles.disabled]: isDisabled,
    })}
    {...rest}
  >
    {children}
  </div>
);

const Header = ({ title, action}) => (
  <div className={styles.header}>
    <h4 className={styles.title}>{title}</h4>
    {action}
  </div>
);

const Footer = ({ action}) => (
  <div className={styles.footer}>
    {action}
  </div>
);

ColumnList.Header = Header;
ColumnList.Footer = Footer;

export default ColumnList;
