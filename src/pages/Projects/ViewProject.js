import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import Redirect from 'umi/redirect';
import { Button, Icon, Rate, Menu, Popover, Dropdown } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';

import styles from './ViewProject.less';

@connect((state, ownProps) => ({
  project: state.entities.projects[ownProps.match.params.id],
  loading: state.loading.effects['projects/fetchProject'],
}))
class ViewProject extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'projects/fetchProject',
      payload: match.params.id,
    });
  }

  render() {
    const { project, match, children } = this.props;

    if (!project) {
      return <PageLoading />;
    }

    if (match.isExact) {
      if (project.selectedBoardId) {
        return <Redirect to={`${match.url}/boards/${project.selectedBoardId}`} />;
      }

      return <Redirect to={`${match.url}/boards/new`} />;
    }
    const projectOptionsMenu = (
      <Menu>
        <Menu.Item key="1">
          <Link to={`${match.url}/workflows`}>Fluxos de Trabalho</Link>
        </Menu.Item>
        <Menu.Item key="2">Membros</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <Link to={`${match.url}/edit`}>Editar Projeto</Link>
        </Menu.Item>
      </Menu>
    );

    const action = (
      <Fragment>
        <Rate count={1} />
        <Popover
          title="Descrição do projeto"
          content={project.description}
          overlayClassName={styles.descriptionPopover}
          trigger="click"
        >
          <Button type="dashed" shape="circle" icon="info-circle-o" />
        </Popover>
        <Button.Group>
          <Dropdown overlay={projectOptionsMenu} placement="bottomRight">
            <Button>
              Menu
              <Icon type="down" />
            </Button>
          </Dropdown>
        </Button.Group>
      </Fragment>
    );

    return (
      <Fragment>
        <PageHeaderWrapper
          hiddenBreadcrumb
          title={<Link to={`${match.url}`}>{project.name}</Link>}
          action={action}
        >
          {children}
        </PageHeaderWrapper>
      </Fragment>
    );
  }
}

export default ViewProject;
