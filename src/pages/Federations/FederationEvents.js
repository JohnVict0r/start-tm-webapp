import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Card, List } from 'antd';
import HeaderWrapper from '@/components/HeaderWrapper';
import ClubListItem from './ClubListItem';
import PageLoading from '@/components/PageLoading';

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
    // const { loadingClubs, match } = this.props;

    if (!clubsByFederation) {
      return <PageLoading />;
    }

    const { clubsIds, meta } = clubsByFederation;

    const paginationProps = {
      current: meta.page,
      pageSize: meta.perPage,
      total: meta.total,
      hideOnSinglePage: true,
      onChange: page => {
        this.handleChangePage(page);
      },
    };

    return (
      <>
        <HeaderWrapper title="Meus Eventos" />
        <Card
          bordered={false}
          title="Eventos"
          extra={
            <Button
              type="primary"
              icon="plus"
              onClick={() => router.push(`/federations/${match.params.federationId}/new-event`)}
            >
              Evento
            </Button>
          }
        >
          <List
            size="large"
            rowKey="id"
            loading={loadingClubs}
            pagination={paginationProps}
            dataSource={clubsIds}
            renderItem={item => <ClubListItem clubId={item} loadingClubs={loadingClubs} />}
          />
        </Card>
      </>
    );
  }
}

export default FederationClubs;
