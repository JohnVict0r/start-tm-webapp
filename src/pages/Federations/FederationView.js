import React, { Component } from 'react';
import { connect } from 'dva';
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
        key: '/events',
        name: 'Eventos',
        icon: 'calendar',
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
