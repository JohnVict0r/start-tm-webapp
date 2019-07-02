import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Card, List } from 'antd';
// import TeamListItem from './TeamListItem';
// import PageLoading from '@/components/PageLoading';

@connect((state, ownProps) => ({
  clubsByFederation: state.clubs.byFederationId[ownProps.match.params.federationId],
  loadingTeams: state.loading.effects['clubs/fetchByFederation'],
}))
class FederationDetails extends Component {
  // componentDidMount() {
  //   const { dispatch, match } = this.props;
  //   dispatch({
  //     type: 'clubs/fetchByFederation',
  //     payload: {
  //       federationId: match.params.federationId,
  //       page: 0,
  //     },
  //   });
  // }

  // handleChangePage = page => {
  //   const { dispatch, match } = this.props;
  //   dispatch({
  //     type: 'clubs/fetchByFederation',
  //     payload: {
  //       federationId: match.params.federationId,
  //       page,
  //     },
  //   });
  // };

  render() {
    // const { clubsByFederation, loadingClubs, match } = this.props;
    const { loadingClubs, match } = this.props;

    // if (!clubsByFederation) {
    //   return <PageLoading />;
    // }

    // const { clubsIds, meta } = clubsByFederation;

    // const paginationProps = {
    //   current: meta.currentPage,
    //   pageSize: meta.perPage,
    //   total: meta.total,
    //   hideOnSinglePage: true,
    //   onChange: page => {
    //     this.handleChangePage(page);
    //   },
    // };

    return (
      <Fragment>
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
            // pagination={paginationProps}
            // dataSource={clubsIds}
            // renderItem={item => <TeamListItem teamId={item} loadingTeams={loadingTeams} />}
          />
        </Card>
      </Fragment>
    );
  }
}

export default FederationDetails;
