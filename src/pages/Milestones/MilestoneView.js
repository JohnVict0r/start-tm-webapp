import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import DescriptionList from '@/components/DescriptionList';
import { makeMilestoneSelector } from './selectors/milestones';

const { Description } = DescriptionList;

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

    const description = (
      <>
        <DescriptionList size="small" col="2">
          <Description term="Equipe">
            <Link to={`/teams/${milestone.team.id}`}>{`${milestone.project.name} / ${
              milestone.team.name
            }`}</Link>
          </Description>
          <Description term="Prazo">
            {`${moment(milestone.startline).format('L')} ~ ${moment(milestone.deadline).format(
              'L'
            )}`}
          </Description>
        </DescriptionList>
        <DescriptionList size="small" col="1">
          <Description term="Descrição">{milestone.description}</Description>
        </DescriptionList>
      </>
    );

    return (
      <PageHeaderWrapper
        title={milestone.name}
        content={description}
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
