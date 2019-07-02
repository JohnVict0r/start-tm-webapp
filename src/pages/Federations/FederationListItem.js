import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Skeleton, Avatar } from 'antd';

@connect((state, ownProps) => ({
  federation: state.entities.federations[ownProps.federationId],
}))
class federationListItem extends PureComponent {
  render() {
    const { federation, loadingFederations } = this.props;

    const DescriptionFederation = ({ data: { name, uf } }) => {
      return (
        <>
          <div>{`${name} - ${uf} `}</div>
          {/* <div>
              <Icon type="clock-circle" />{' '}
            </div> */}
        </>
      );
    };

    return (
      <List.Item>
        <Skeleton title={false} loading={loadingFederations} active>
          <List.Item.Meta
            avatar={
              <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUC0LYGdxwCD9TEukVRqL3OWRqTyT95SoupznUTkGm49-uwyM33A" />
            }
            title={<Link to={`/federations/${federation.id}`}>{federation.initials}</Link>}
            description={<DescriptionFederation data={federation} />}
          />
        </Skeleton>
      </List.Item>
    );
  }
}

export default federationListItem;
