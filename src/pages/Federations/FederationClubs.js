import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Card, List } from 'antd';
import HeaderWrapper from '@/components/HeaderWrapper';
import ClubListItem from './ClubListItem';
import PageLoading from '@/components/PageLoading';
import getPaginationProps from '@/utils/getPaginationProps';

@connect((state, ownProps) => ({
  clubsByFederation: state.clubs.byFederationId[ownProps.match.params.federationId],
  loadingClubs: state.loading.effects['clubs/fetchByFederation'],
}))
class FederationClubs extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'clubs/fetchByFederation',
      payload: {
        federation_id: match.params.federationId,
        page: 0,
      },
    });
  }

  handleChangePage = page => {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'clubs/fetchByFederation',
      payload: {
        federation_id: match.params.federationId,
        page,
      },
    });
  };

  render() {
    const { clubsByFederation, loadingClubs, match } = this.props;

    if (!clubsByFederation) {
      return <PageLoading />;
    }

    return (
      <>
        <HeaderWrapper title="Clubes" />
        <Card
          bordered={false}
          title="Clubes"
          extra={
            <Button
              type="primary"
              icon="plus"
              onClick={() => router.push(`/federations/${match.params.federationId}/new-club`)}
            >
              Clube
            </Button>
          }
        >
          <List
            size="large"
            rowKey="id"
            loading={loadingClubs}
            pagination={getPaginationProps(clubsByFederation.meta)}
            dataSource={clubsByFederation.clubsIds}
            renderItem={item => <ClubListItem id={item} loading={loadingClubs} />}
          />
        </Card>
      </>
    );
  }
}

export default FederationClubs;
