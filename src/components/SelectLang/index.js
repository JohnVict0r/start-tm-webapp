import React, { PureComponent } from 'react';
import { formatMessage, setLocale, getLocale } from 'umi/locale';
import { Menu, Icon } from 'antd';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export default class SelectLang extends PureComponent {
  changLang = ({ key }) => {
    setLocale(key);
  };

  render() {
    const { className } = this.props;
    const selectedLang = getLocale();
    const langMenu = (
      <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={this.changLang}>
        <Menu.Item key="pt-BR">
          <span role="img" aria-label="Português">
            🇵🇹
          </span>{' '}
          Português
        </Menu.Item>
      </Menu>
    );
    return (
      <HeaderDropdown overlay={langMenu} placement="bottomRight">
        <span className={classNames(styles.dropDown, className)}>
          <Icon type="global" title={formatMessage({ id: 'navBar.lang' })} />
        </span>
      </HeaderDropdown>
    );
  }
}
