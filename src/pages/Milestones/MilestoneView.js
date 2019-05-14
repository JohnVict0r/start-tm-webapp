import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Tag, Icon } from 'antd';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import { makeMilestoneSelector } from './selectors/milestones';

@connect((state, ownProps) => {
  const milestoneSelector = makeMilestoneSelector({ id: ownProps.match.params.milestoneId });
  return {
    milestone: milestoneSelector(state),
    loading: state.loading.effects['milestones/fetchMilestone'],
  };
})
class MilestoneView extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'milestones/fetchMilestone',
      payload: {
        id: match.params.milestoneId,
      },
    });
  }

  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'details':
        router.push(`${match.url}/details`);
        break;
      case 'edit':
        router.push(`${match.url}/edit`);
        break;
      default:
        break;
    }
  };

  render() {
    const { milestone, match, location, children } = this.props;

    if (!milestone) {
      return <PageLoading />;
    }

    const tabList = [
      {
        key: 'details',
        tab: 'Detalhes',
      },
      {
        key: 'edit',
        tab: 'Configurações',
      },
    ];

    return (
      <PageHeaderWrapper
        title={milestone.name}
        subTitle={`${milestone.project.name} / ${milestone.team.name}`}
        tags={
          <Tag color="red">
            <Icon type="clock-circle" />{' '}
            {`${moment(milestone.startline).format('L')} ~ ${moment(milestone.deadline).format(
              'L'
            )}`}
          </Tag>
        }
        content={milestone.description}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.url}/`, '')}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default MilestoneView;
