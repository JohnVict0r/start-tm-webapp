import React, { PureComponent } from 'react';
import { connect } from 'dva';
import AvatarList from '@/components/AvatarList';
import styles from './index.less';

@connect(({ entities }, { usersIds }) => ({
  users: usersIds.map(id => entities.users[id])
}))
class AvatarUserList extends PureComponent {
  render() {
    const { users } = this.props;

    return (
      <span className={styles.avatarList}>
        <AvatarList
          size="mini"
          maxLength={3}
          excessItemsStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        >
          {users.map(user => (
            <AvatarList.Item
              key={`avatar-${user.id}`}
              src={user.avatar}
              tips={user.name}
            />
          ))}
        </AvatarList>
      </span>
    );
  }
}

export default AvatarUserList;
