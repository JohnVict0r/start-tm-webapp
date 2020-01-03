import React, { PureComponent } from 'react';
import defaultSettings from '@/defaultSettings';
import styles from './GridContent.less';

class GridContent extends PureComponent {
  render() {
    const { children } = this.props;
    let className = `${styles.main}`;
    if (defaultSettings.contentWidth === 'Fixed') {
      className = `${styles.main} ${styles.wide}`;
    }
    return <div className={className}>{children}</div>;
  }
}

export default GridContent;
