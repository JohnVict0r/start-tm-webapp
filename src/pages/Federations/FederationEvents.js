import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Card, List } from 'antd';
import HeaderWrapper from '@/components/HeaderWrapper';
import EventListItem from './EventListItem';
import PageLoading from '@/components/PageLoading';
import getPaginationProps from '@/utils/getPaginationProps';

@connect((state, ownProps) => ({
  eventsByFederation: state.events.byFederationId[ownProps.match.params.federationId],
  loadingEvents: state.loading.effects['events/fetchByFederation'],
}))
class FederationEvents extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'events/fetchByFederation',
      payload: {
        federation_id: match.params.federationId,
        page: 0,
      },
    });
  }

  handleChangePage = page => {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'events/fetchByFederation',
      payload: {
        federation_id: match.params.federationId,
        page,
      },
    });
  };

  render() {
    const { eventsByFederation, loadingEvents, match } = this.props;

    if (!eventsByFederation) {
      return <PageLoading />;
    }

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
            loading={loadingEvents}
            pagination={getPaginationProps(eventsByFederation.meta)}
            dataSource={eventsByFederation.eventsIds}
            // TODO corrigir listagem quando organizar o TTEvent no backend
            renderItem={item => <EventListItem id={item} loading={loadingEvents} />}
          />
        </Card>
      </>
    );
  }
}

export default FederationEvents;
