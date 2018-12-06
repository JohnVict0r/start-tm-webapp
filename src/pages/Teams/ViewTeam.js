import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
import { Button, Dropdown, Icon, Menu, Popover } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import { FavoriteIcon } from '@/components/Favorite';
import Link from 'umi/link';

import styles from './ViewTeam.less';

@connect((state, ownProps) => ({
  team: state.entities.teams[ownProps.match.params.id],
  loading: state.loading.effects['teams/fetchTeam'],
}))
class ViewTeam extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'teams/fetchTeam',
      payload: match.params.id,
    });
  }

  handleFavorite = () => {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'teams/favoriteTeam',
      payload: match.params.id,
    });
  };

  render() {
    const { team, children, match } = this.props;

    if (!team) {
      return <PageLoading />;
    }

    const teamOptionsMenu = (
      <Menu>
        <Menu.Item key="1">
          <Link to={`${match.url}/projects`}>
            <FormattedMessage id="menu.projects" />
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={`${match.url}/workflows`}>
            <FormattedMessage id="menu.workflows" />
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={`${match.url}/members`}>
            <FormattedMessage id="menu.teams.team.members" />
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4">
          <Link to={`/teams/${match.params.id}/edit`}>Editar Equipe</Link>
        </Menu.Item>
      </Menu>
    );

    const action = (
      <Fragment>
        <FavoriteIcon onClick={this.handleFavorite} favorited={team.favorited} />
        <Popover
          title="Descrição da equipe"
          content={team.description}
          overlayClassName={styles.descriptionPopover}
          trigger="click"
        >
          <Button type="dashed" shape="circle" icon="info-circle-o" />
        </Popover>
        <Button.Group>
          <Dropdown overlay={teamOptionsMenu} placement="bottomRight">
            <Button>
              Menu
              <Icon type="down" />
            </Button>
          </Dropdown>
        </Button.Group>
      </Fragment>
    );

    return (
      <PageHeaderWrapper
        hiddenBreadcrumb
        title={<Link to={`${match.url}`}>{team.name}</Link>}
        action={action}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default ViewTeam;
