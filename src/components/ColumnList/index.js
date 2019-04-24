import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const ColumnList = ({ children, innerRef, isDisabled, className, ...rest }) => (
  <div
    className={classNames(className, styles.column, {
      [styles.disabled]: isDisabled,
    })}
    ref={innerRef}
    {...rest}
  >
    {children}
  </div>
);

const Header = ({ title, actions, className, ...props }) => (
  <div className={classNames(className, styles.header)} {...props}>
    <h4 className={styles.title}>{title}</h4>
    {actions}
  </div>
);

const Footer = ({ actions }) => <div className={styles.footer}>{actions}</div>;

ColumnList.Header = Header;
ColumnList.Footer = Footer;

export default ColumnList;
