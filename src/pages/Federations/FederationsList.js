import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, List, Card } from 'antd';
import Authorized from '@/utils/Authorized';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FederationListItem from './FederationListItem';

import styles from './FederationsList.less';

@connect(state => ({
  federations: state.federations.forCurrentUser,
  loadingFederations: state.loading.effects['federations/fetchfederations'],
}))
class ClubsList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'federations/fetchFederations',
    });
  }

  render() {
    const {
      federations: { federationIds, meta },
      loadingFederations,
    } = this.props;

    const paginationProps = {
      current: meta.page,
      pageSize: meta.perPage,
      total: meta.total,
      hideOnSinglePage: true,
    };

    return (
      <PageHeaderWrapper
        title="Minhas Federações"
        extra={
          <Authorized authority={['Administrador']}>
            <Button type="primary" icon="plus" onClick={() => router.push('/federations/new')}>
              Federação
            </Button>
          </Authorized>
        }
      >
        <div className={styles.standardList}>
          <Card className={styles.listCard} bordered={false}>
            <List
              size="large"
              rowKey="id"
              loading={loadingFederations}
              pagination={paginationProps}
              dataSource={federationIds}
              renderItem={item => (
                <FederationListItem federationId={item} loadingFederations={loadingFederations} />
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ClubsList;
