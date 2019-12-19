import React from 'react';
import withRouter from 'umi/withRouter';
import Link from 'umi/link';
import { Avatar, Layout, Menu, Typography } from 'antd';
import classNames from 'classnames';
import { urlToList } from '@/components/_utils/pathTools';
import getIcon from '@/utils/getIcon';
import styles from './index.less';

const PageWrapper = ({
  location,
  match,
  children,
  fluid,
  theme = 'light',
  top,
  title,
  subtitle,
  avatar,
  menuData,
  extraMenu,
}) => {
  function getNavMenuItems(menusData) {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name)
      .map(item => getSubMenuOrItem(item))
      .filter(item => item);
  }

  function getSubMenuOrItem(item) {
    const itemTitle = item.icon ? (
      <span>
        {getIcon(item.icon)}
        <span>{item.name}</span>
      </span>
    ) : (
      item.name
    );

    if (item.children && item.children.some(child => child.name)) {
      return (
        <Menu.SubMenu key={item.key} title={itemTitle}>
          {getNavMenuItems(item.children)}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item key={item.key}>
        <Link to={`${match.url}${item.key}`}>{itemTitle}</Link>
      </Menu.Item>
    );
  }

  const renderMenu = () => {
    if (menuData && menuData.length) {
      const currentPage = location.pathname.replace(`${match.url}`, '');
      const urlList = urlToList(currentPage);
      return (
        <Menu
          key="Menu"
          theme={theme}
          mode="inline"
          style={{ borderRight: 0 }}
          selectedKeys={urlList}
          defaultOpenKeys={urlList}
        >
          {getNavMenuItems(menuData)}
        </Menu>
      );
    }
    return null;
  };

  return (
    <Layout style={{ margin: '-24px', minHeight: '100vh' }}>
      {menuData && (
        <Layout.Sider
          width={250}
          theme={theme}
          style={{ borderRight: '1px solid #e8e8e8' }}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className={styles.menuHeader}>
            {avatar && <Avatar size="large" {...avatar} />}
            {top && (
              <Typography.Paragraph className={styles.top} ellipsis type="secondary">
                {top}
              </Typography.Paragraph>
            )}
            <Typography.Paragraph className={styles.title} ellipsis={{ rows: 2 }} strong>
              {title}
            </Typography.Paragraph>
            {subtitle && (
              <Typography.Paragraph
                className={styles.subtitle}
                ellipsis={{ rows: 2 }}
                type="secondary"
              >
                {subtitle}
              </Typography.Paragraph>
            )}
          </div>
          {extraMenu && <div className={styles.extraMenu}>{extraMenu}</div>}
          {renderMenu()}
        </Layout.Sider>
      )}
      <Layout style={{ padding: '24px' }}>
        <Layout.Content>
          <div
            className={classNames(styles.content, {
              [styles.wide]: !fluid,
            })}
          >
            {children}
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(PageWrapper);
