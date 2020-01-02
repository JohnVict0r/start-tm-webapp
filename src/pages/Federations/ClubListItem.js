import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Skeleton } from 'antd';

@connect((state, ownProps) => ({
  club: state.entities.clubs[ownProps.id],
}))
class ClubListItem extends PureComponent {
  render() {
    const { club, loading } = this.props;

    const DescriptionClub = ({ data: { address } }) => {
      return (
        <>
          <div>{`${address.city} - ${address.uf} `}</div>
          {/* <div>
              <Icon type="clock-circle" />{' '}
            </div> */}
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
            title={<Link to={`/clubs/${club.id}`}>{club.name}</Link>}
            description={<DescriptionClub data={club} />}
          />
        </Skeleton>
      </List.Item>
    );
  }
}

export default ClubListItem;
