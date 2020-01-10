import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, List, Card } from 'antd';
import Authorized from '@/utils/Authorized';
import getPaginationProps from '@/utils/getPaginationProps';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FederationListItem from './FederationListItem';

import styles from './FederationsList.less';

@connect(state => ({
  federations: state.federations.forCurrentUser,
  loadingFederations: state.loading.effects['federations/fetchFederations'],
}))
class FederationsList extends PureComponent {
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

    return (
      <PageHeaderWrapper
        title="Minhas Federações"
        extra={
          <Authorized authority={['Administrator']}>
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
              pagination={getPaginationProps(meta)}
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

export default FederationsList;
