import React, { PureComponent } from 'react';
import { Spin, Icon, Menu } from 'antd';
import Link from 'umi/link';
import { FormattedMessage } from 'umi/locale';
import HeaderDropdown from '../HeaderDropdown';

import styles from './FavoriteList.less';

export default class FavoriteList extends PureComponent {
  render() {
    const { loading, favorites, className, onFavoriteVisibleChange } = this.props;

    const menu = loading ? (
      <div className={styles.spin}>
        <Spin delay={0} />
        <div>Carregango favoritos...</div>
      </div>
    ) : (
      <Menu className={styles.menu}>
        {Object.keys(favorites).map(key => (
          <Menu.ItemGroup
            title={
              <span>
                <Icon type="star" theme="filled" className={styles.starIcon} />
                <FormattedMessage id={`menu.${key}`} />
              </span>
            }
          >
            {favorites[key].map(item => (
              <Menu.Item key={`${key}-${item.favoriteableId}`}>
                <Link to={`/${key}/${item.favoriteableId}`}>{item.favoriteableName}</Link>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        ))}
      </Menu>
    );

    return (
      <HeaderDropdown
        placement="bottomRight"
        overlay={menu}
        overlayClassName={styles.container}
        onVisibleChange={onFavoriteVisibleChange}
      >
        <span className={className}>
          <Icon type="star" style={{ fontSize: '18px' }} />
        </span>
      </HeaderDropdown>
    );
  }
}
