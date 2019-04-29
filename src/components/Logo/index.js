import React from 'react';
import Link from 'umi/link';

import styles from './index.less';
import logo from '../../assets/logo.svg';


const Logo = () => (
  <div className={styles.top}>
    <div className={styles.header}>
      <Link to="/">
        <img alt="logo" className={styles.logo} src={logo} />
        <span className={styles.title}>The Manager</span>
      </Link>
    </div>
    <div className={styles.desc}>Gerenciamento de projeto feito da forma fácil</div>
  </div>
);

export default Logo;
