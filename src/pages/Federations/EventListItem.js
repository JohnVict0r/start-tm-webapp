import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Skeleton } from 'antd';

@connect((state, ownProps) => ({
  event: state.entities.clubs[ownProps.id],
}))
class EventListItem extends PureComponent {
  render() {
    const { event, loading } = this.props;

    // const DescriptionEvent = ({ data: { address } }) => {
    //   return (
    //     <>
    //       <div>{`${address.city} - ${address.uf} `}</div>
    //       {/* <div>
    //           <Icon type="clock-circle" />{' '}
    //         </div> */}
    //     </>
    //   );
    // };

    return (
      <List.Item>
        <Skeleton title={false} loading={loading} active>
          <List.Item.Meta
            // avatar={
            //   <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUC0LYGdxwCD9TEukVRqL3OWRqTyT95SoupznUTkGm49-uwyM33A" />
            // }
            title={<Link to={`/events/${event.id}`}>{event.name}</Link>}
            // description={<DescriptionClub data={club} />}
          />
        </Skeleton>
      </List.Item>
    );
  }
}

export default EventListItem;
