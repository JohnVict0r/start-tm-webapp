import React, { Component } from 'react';
import { connect } from 'dva';
import PageWrapper from '@/components/PageWrapper';
import PageLoading from '@/components/PageLoading';

@connect((state, ownProps) => {
  return {
    club: state.entities.clubs[ownProps.match.params.clubId],
    loading: state.loading.effects['clubs/fetchClub'],
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

  render() {
    const { club, loading, children } = this.props;

    if (!club || (club && !club.federation) || !!loading) {
      return <PageLoading />;
    }

    const menuData = [
      {
        key: '/details',
        name: 'Detalhes',
        icon: 'dashboard',
      },
      {
        key: '/athletes',
        name: 'Atletas',
        icon: 'team',
      },
      {
        key: '/edit',
        name: 'Configurações',
        icon: 'setting',
      },
    ];

    const descriptionClub = `${club.address.city} - ${club.federation.uf}`;

    return (
      <PageWrapper
        top="Clube"
        title={club.name}
        // avatar={{
        //   src:
        //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUC0LYGdxwCD9TEukVRqL3OWRqTyT95SoupznUTkGm49-uwyM33A',
        //   alt: federation.initials,
        // }}
        menuData={menuData}
        subtitle={descriptionClub}
      >
        {children}
      </PageWrapper>
    );
  }
}

export default ClubView;
