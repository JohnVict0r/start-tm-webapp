import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Skeleton } from 'antd';

@connect((state, ownProps) => ({
  club: state.entities.clubs[ownProps.clubId],
}))
class clubListItem extends PureComponent {
  render() {
    const { club, loadingClubs } = this.props;

    const DescriptionClub = ({ data: { address } }) => {
      return (
        <>
          <div>{`${address.city} - ${address.state} `}</div>
          {/* <div>
              <Icon type="clock-circle" />{' '}
            </div> */}
        </>
      );
    };

    return (
      <List.Item>
        <Skeleton title={false} loading={loadingClubs} active>
          <List.Item.Meta
            // avatar={
            //   <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUC0LYGdxwCD9TEukVRqL3OWRqTyT95SoupznUTkGm49-uwyM33A" />
            // }
            title={<Link to={`/clubs/${club.id}`}>{club.name}</Link>}
            description={<DescriptionClub data={club} />}
          />
        </Skeleton>
      </List.Item>
    );
  }
}

export default clubListItem;
