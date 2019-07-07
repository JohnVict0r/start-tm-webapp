import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
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
    const { federation, match, location, children } = this.props;

    if (!federation) {
      return <PageLoading />;
    }

    const tabList = [
      {
        key: 'clubs',
        tab: 'Clubes',
      },
      // {
      //   key: 'athletes',
      //   tab: 'Atletas',
      // },
      {
        key: 'edit',
        tab: 'Configurações',
      },
    ];

    return (
      <PageHeaderWrapper
        title={federation.initials}
        logo={
          <img
            alt={federation.initials}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUC0LYGdxwCD9TEukVRqL3OWRqTyT95SoupznUTkGm49-uwyM33A"
          />
        }
        content={federation.name}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.url}/`, '')}
        onTabChange={this.handleTabChange}
        hiddenBreadcrumb
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default FederationView;
