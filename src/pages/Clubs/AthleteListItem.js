import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Skeleton } from 'antd';

@connect((state, ownProps) => ({
  athlete: state.entities.athletes[ownProps.id],
}))
class AthleteListItem extends PureComponent {
  render() {
    const { athlete, loading } = this.props;

    const DescriptionAthlete = () => {
      return (
        <>
          <div>{` Pontuação (RAT): ${athlete.rating} `}</div>
          {/* TODO - Data de nascimento + createdAt + */}
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
            title={<Link to={`/clubs/${athlete.id}`}>{athlete.people.name}</Link>}
            description={<DescriptionAthlete data={athlete} />}
          />
        </Skeleton>
      </List.Item>
    );
  }
}

export default AthleteListItem;
