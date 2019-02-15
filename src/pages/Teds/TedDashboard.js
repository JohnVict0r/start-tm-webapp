import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card } from 'antd';

import styles from './TedDashboard.less';

const tabList = [
  {
    key: 'goals',
    tab: 'Metas',
  },
  {
    key: 'activities',
    tab: 'Atividades',
  },
  {
    key: 'actions',
    tab: 'Ações',
  },
];

@connect()
// state => ({
//
// })
class TedDashboard extends PureComponent {
  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'goals':
        router.push(`${match.url}/goals`);
        break;
      case 'activities':
        router.push(`${match.url}/activities`);
        break;
      case 'actions':
        router.push(`${match.url}/actions`);
        break;
      default:
        break;
    }
  };

  render() {
    const { location, match, children } = this.props;

    return (
      <Card
        className={styles.tabsCard}
        bordered={false}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        {children}
      </Card>
    );
  }
}

export default TedDashboard;
