import React, { Component } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Button, Dropdown, Icon, Menu } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import { FavoriteIcon } from '@/components/Favorite';

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
      <div>
        <FavoriteIcon
          className={styles.action}
          onClick={this.handleFavorite}
          favorited={team.favorited}
        />
        <Button.Group>
          <Button onClick={() => router.push(`${match.url}/members`)}>Membros</Button>
          <Dropdown overlay={teamOptionsMenu} placement="bottomRight">
            <Button>
              <Icon type="ellipsis" />
            </Button>
          </Dropdown>
        </Button.Group>
      </div>
    );

    return (
      <PageHeaderWrapper
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        title={
          <Link to={match.url}>
            <Ellipsis lines={1}>{team.name}</Ellipsis>
          </Link>
        }
        action={action}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default ViewTeam;
