import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import PageWrapper from '@/components/PageWrapper';
import PageLoading from '@/components/PageLoading';

@connect((state, ownProps) => {
  return {
    federation: state.entities.federations[ownProps.match.params.federationId],
    loading: state.loading.effects['federations/fetchFederation'],
  };
})
class FederationView extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'federations/fetchFederation',
      payload: {
        federationId: match.params.federationId,
      },
    });
  }

  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'clubs':
        router.push(`${match.url}/clubs`);
        break;
      // case 'members':
      //   router.push(`${match.url}/athletes`);
      //   break;
      case 'edit':
        router.push(`${match.url}/edit`);
        break;
      default:
        break;
    }
  };

  render() {
    const { federation, children } = this.props;

    if (!federation) {
      return <PageLoading />;
    }

    const menuData = [
      {
        key: '/details',
        name: 'Detalhes',
        icon: 'dashboard',
      },
      {
        key: '/clubs',
        name: 'Clubes',
        icon: 'team',
      },
      {
        key: '/edit',
        name: 'Configurações',
        icon: 'setting',
      },
    ];

    return (
      <PageWrapper
        top="Federação"
        title={federation.name}
        avatar={{
          src:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUC0LYGdxwCD9TEukVRqL3OWRqTyT95SoupznUTkGm49-uwyM33A',
          alt: federation.initials,
        }}
        menuData={menuData}
      >
        {children}
      </PageWrapper>
    );
  }
}

export default FederationView;
