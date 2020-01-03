import React from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Media from 'react-media';
import defaultSettings from '@/defaultSettings';
import logo from '../assets/logo.svg';
import Header from './Header';
import Context from './MenuContext';
import SiderMenu from '@/components/SiderMenu';
import getPageTitle from '@/utils/getPageTitle';

import styles from './BasicLayout.less';

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.Component {
  componentDidMount() {
    const {
      dispatch,
      route: { routes, path, authority },
    } = this.props;
    dispatch({
      type: 'global/fetchLoggedInUser',
    });
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, path, authority },
    });
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  getLayoutStyle = () => {
    const { isMobile, collapsed } = this.props;
    const { fixSiderbar, layout } = defaultSettings;

    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  render() {
    const {
      children,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
    } = this.props;
    const { layout: PropsLayout, fixedHeader, navTheme } = defaultSettings;

    const isTop = PropsLayout === 'topmenu';
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const layout = (
      <Layout className={styles.layout}>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...defaultSettings}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...defaultSettings}
            {...this.props}
          />
          <Content className={styles.content} style={contentStyle}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
    return (
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <ContainerQuery query={query}>
          {params => (
            <Context.Provider value={this.getContext()}>
              <div className={classNames(params)}>{layout}</div>
            </Context.Provider>
          )}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(({ global, menu: menuModel }) => ({
  collapsed: global.collapsed,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
