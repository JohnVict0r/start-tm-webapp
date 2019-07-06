import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { Button } from 'antd';
import { FavoriteButton } from '@/components/Favorite';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';

@connect((state, ownProps) => {
  return {
    club: state.entities.clubs[ownProps.match.params.clubId],
    loading: state.loading.effects['teams/fetchTeam'],
    favoriting: state.loading.effects['teams/favoriteTeam'],
  };
})
class ClubView extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'clubs/fetchClub',
      payload: match.params.clubId,
    });
  }

  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'athletes':
        router.push(`${match.url}/athletes`);
        break;
      case 'members':
        router.push(`${match.url}/members`);
        break;
      case 'edit':
        router.push(`${match.url}/edit`);
        break;
      default:
        break;
    }
  };

  render() {
    const { club, favoriting, children, location, match } = this.props;

    if (!club) {
      return <PageLoading />;
    }

    const tabList = [
      {
        key: 'athletes',
        tab: 'Atletas',
      },
      {
        key: 'members',
        tab: 'Membros',
      },
      {
        key: 'edit',
        tab: 'Configurações',
      },
    ];

    const DescriptionClub = ({ club: { address, federation } }) => {
      return (
        <>
          <div>{`${address.city} - ${federation.uf} `}</div>
          {/*
            <div>{`Endereço: ${address.street}, ${address.number}, ${address.neighborhood}`}</div>
            <div>
              <Icon type="clock-circle" />{' '}
            </div> */}
        </>
      );
    };

    return (
      <PageHeaderWrapper
        title={club.name}
        subTitle={<Link to={`/federations/${club.federation.id}`}>{club.federation.initials}</Link>}
        // logo={<img alt={team.project.name} src={team.project.avatar} />}
        content={<DescriptionClub club={club} />}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.url}/`, '')}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default ClubView;
