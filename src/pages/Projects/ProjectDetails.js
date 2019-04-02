import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import {Card, List, Skeleton} from 'antd';
import { projectBoardsSelector } from './selectors/projects';

@connect((state) => {
  return {
    boards: projectBoardsSelector(state),
    loadingBoards: state.loading.effects['projects/fetchProjectBoards'],
  };
})
class ProjectDetails extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'projects/fetchProjectBoards',
      payload: match.params.projectId,
    });
  }

  render() {
    const { boards, loadingBoards } = this.props;

    return (
      <Fragment>
        <Card
          bordered={false}
          title="Quadros"
        >
          <List
            size="large"
            rowKey="id"
            loading={loadingBoards}
            dataSource={boards}
            renderItem={item => (
              <List.Item>
                <Skeleton title={false} loading={loadingBoards} active>
                  <List.Item.Meta
                    title={<Link to={`/boards/${item.id}`}>{item.name}</Link>}
                    description={item.description}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
      </Fragment>
    );
  }
}

export default ProjectDetails;
