import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { Avatar, Button, Card, List, Skeleton } from 'antd';
import { projectTeamsSelector } from './selectors/projects';

@connect(state => {
  return {
    teams: projectTeamsSelector(state),
    loadingTeams: state.loading.effects['projects/fetchProjectTeams'],
  };
})
class ProjectDetails extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'projects/fetchProjectTeams',
      payload: match.params.projectId,
    });
  }

  render() {
    const { teams, loadingTeams, match } = this.props;

    return (
      <Fragment>
        <Card
          bordered={false}
          title="Equipes"
          extra={
            <Button
              type="primary"
              icon="plus"
              onClick={() => router.push(`/projects/${match.params.projectId}/new-team`)}
            >
              Equipe
            </Button>
          }
        >
          <List
            size="large"
            rowKey="id"
            loading={loadingTeams}
            dataSource={teams}
            renderItem={item => (
              <List.Item>
                <Skeleton title={false} loading={loadingTeams} active>
                  <List.Item.Meta
                    title={<Link to={`/teams/${item.id}`}>{item.name}</Link>}
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
