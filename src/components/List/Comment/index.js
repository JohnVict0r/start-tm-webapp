import React, { PureComponent } from 'react';
import { List, Avatar,Comment } from 'antd';
import { FormattedMessage } from 'umi/locale';

class CommentList extends PureComponent {
  componentDidMount() {}

  render() {
    const { comments,users } = this.props;
    if (comments[0]) {
      return (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={item => (
            <Comment
              actions={[<span>Edit</span>]}
              author={users[item.commented].name}
              avatar={(
                <Avatar
                  src={users[item.commented].pictureUrl}
                />
              )}
              content={item.comment}
            />
          )}
        />
      );
    }
    return (
      <div>
        <FormattedMessage id="menu.card.nocommet" defaultMessage="No comment" />
      </div>
    );
  }
}

export default CommentList;
