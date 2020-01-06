import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Skeleton, Icon } from 'antd';
import moment from 'moment';

@connect((state, ownProps) => ({
  event: state.entities.events[ownProps.id],
}))
class EventListItem extends PureComponent {
  render() {
    const { event, loading } = this.props;

    const DescriptionEvent = () => {
      return (
        <>
          <div>
            {/* {`De `} */}
            <Icon type="clock-circle" />
            {` ${moment(event.start).format('L')} a ${moment(event.end).format('L')}`}
          </div>
        </>
      );
    };

    return (
      <List.Item>
        <Skeleton title={false} loading={loading} active>
          <List.Item.Meta
            // avatar={
            //   <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUC0LYGdxwCD9TEukVRqL3OWRqTyT95SoupznUTkGm49-uwyM33A" />
            // }
            title={<Link to={`/events/${event.id}`}>{event.name}</Link>}
            description={<DescriptionEvent />}
          />
        </Skeleton>
      </List.Item>
    );
  }
}

export default EventListItem;
