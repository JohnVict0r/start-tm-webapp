import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Card, List } from 'antd';
import HeaderWrapper from '@/components/HeaderWrapper';
// import AthleteListItem from './ClubListItem';
import PageLoading from '@/components/PageLoading';
import getPaginationProps from '@/utils/getPaginationProps';

@connect((state, ownProps) => ({
  athletesByClub: state.athletes.byClubId[ownProps.match.params.clubId],
  loadingAthletes: state.loading.effects['athletes/fetchByClub'],
}))
class ClubAthletes extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'athletes/fetchByClub',
      payload: {
        club_id: match.params.clubId,
        page: 0,
      },
    });
  }

  handleChangePage = page => {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'athletes/fetchByClub',
      payload: {
        club_id: match.params.clubId,
        page,
      },
    });
  };

  render() {
    const { athletesByClub, loadingAthletes, match } = this.props;

    if (!athletesByClub) {
      return <PageLoading />;
    }

    return (
      <>
        <HeaderWrapper title="Clubes" />
        <Card
          bordered={false}
          title="Atletas"
          extra={
            <Button
              type="primary"
              icon="plus"
              onClick={() => router.push(`/clubs/${match.params.clubId}/new-athlete`)}
            >
              Atleta
            </Button>
          }
        >
          <List
            size="large"
            rowKey="id"
            loading={loadingAthletes}
            pagination={getPaginationProps(athletesByClub.meta)}
            dataSource={athletesByClub.athletesIds}
            // renderItem={item => <ClubListItem id={item} loading={loadingAthletes} />}
          />
        </Card>
      </>
    );
  }
}

export default ClubAthletes;
