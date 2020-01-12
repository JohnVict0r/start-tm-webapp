import React, { Component } from 'react';
import { connect } from 'dva';
import PageWrapper from '@/components/PageWrapper';
import PageLoading from '@/components/PageLoading';

@connect((state, ownProps) => {
  return {
    event: state.entities.events[ownProps.match.params.eventId],
    loading: state.loading.effects['events/fetchEvent'],
  };
})
class EventView extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'events/fetchEvent',
      payload: match.params.eventId,
    });
  }

  render() {
    const { event, children } = this.props;

    if (!event) {
      return <PageLoading />;
    }

    const menuData = [
      {
        key: '/details',
        name: 'Detalhes',
        icon: 'dashboard',
      },
      {
        key: '/subscriptions',
        name: 'Incrições',
        icon: 'idcard',
      },
      {
        key: '/tables',
        name: 'Mesas',
        icon: 'minus-square',
      },
      {
        key: '/championships',
        name: 'Categorias',
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
        top="Evento"
        title={event.name}
        // avatar={{
        //   src:
        //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUC0LYGdxwCD9TEukVRqL3OWRqTyT95SoupznUTkGm49-uwyM33A',
        //   alt: federation.initials,
        // }}
        menuData={menuData}
      >
        {children}
      </PageWrapper>
    );
  }
}

export default EventView;
