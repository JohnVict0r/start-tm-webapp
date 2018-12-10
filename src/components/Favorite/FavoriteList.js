import React, { PureComponent } from 'react';
import sortBy from 'lodash/sortBy';
import { Spin, Icon, Menu } from 'antd';
import Link from 'umi/link';
import { FormattedMessage } from 'umi/locale';
import HeaderDropdown from '../HeaderDropdown';

import styles from './FavoriteList.less';

export default class FavoriteList extends PureComponent {
  renderFavoritesBox = () => {
    const { loading, favorites } = this.props;

    if (loading) {
      return (
        <div className={styles.msg}>
          <Spin delay={0} />
          <div>Carregango favoritos...</div>
        </div>
      );
    }

    if (Object.keys(favorites).length === 0) {
      return (
        <div className={styles.msg}>
          <div>Você ainda não tem favoritos!</div>
        </div>
      );
    }

    return (
      <Menu className={styles.menu}>
        {Object.keys(favorites)
          .sort()
          .map(key => (
            <Menu.ItemGroup
              key={key}
              title={
                <span>
                  <Icon type="star" theme="filled" className={styles.starIcon} />
                  <FormattedMessage id={`menu.${key}`} />
                </span>
              }
            >
              {sortBy(favorites[key], 'name').map(item => (
                <Menu.Item key={`${key}-${item.id}`}>
                  <Link to={`/${key}/${item.id}`}>{item.name}</Link>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          ))}
      </Menu>
    );
  };

  render() {
    const { className, onFavoriteVisibleChange } = this.props;
    return (
      <HeaderDropdown
        placement="bottomRight"
        overlay={this.renderFavoritesBox()}
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
