import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Skeleton } from 'antd';

import { cardSelector } from '@/selectors/cards';

@connect((state, props) => ({
  card: cardSelector(state, props),
}))
class CardsListItem extends PureComponent {

  render() {
    const { card } = this.props;
    const { project, team } = card;

    return (
      <List.Item>
        <Skeleton title={false} loading={false} active>
          <List.Item.Meta
            title={<Link to={`/teams/${team.id}/board/cards/${card.id}`}>{card.name}</Link>}
            description={`${project.name} / ${team.name}`}
          />
        </Skeleton>
      </List.Item>
    );
  }
}

export default CardsListItem;
