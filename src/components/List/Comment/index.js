import React, { PureComponent } from 'react';
import { List, Avatar } from 'antd';
import { FormattedMessage } from 'umi/locale';

class CommentList extends PureComponent {
  componentDidMount() {}

  render() {
    const { data } = this.props;
    if (data) {
      return (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={[<a>edit</a>, <a>more</a>]}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.name.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </List.Item>
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
