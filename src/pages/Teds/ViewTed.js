import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Avatar, Button, Dropdown, Icon, Menu } from 'antd';

import PageLoading from '@/components/PageLoading';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import Ellipsis from '@/components/Ellipsis';
import { makeTedSelector } from '@/selectors/teds';

const { Description } = DescriptionList;

const menu = (
  <Menu>
    <Menu.Item key="1">Editar TED</Menu.Item>
  </Menu>
);

const action = (
  <Fragment>
    <Button.Group>
      <Button>Relatórios</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    </Button.Group>
  </Fragment>
);

@connect((state, ownProps) => {
  const tedSelector = makeTedSelector({ id: ownProps.match.params.tedId });
  return {
    ted: tedSelector(state),
    loading: state.loading.effects['teds/fetchTed'],
  };
})
class ViewTed extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'teds/fetchTed',
      payload: match.params.tedId,
    });
  }

  render() {
    const { ted, children } = this.props;

    if (!ted) {
      return <PageLoading />;
    }

    const description = (
      <DescriptionList size="small" col="2">
        <Description term="Criado em">
          {moment(ted.createdAt.date).format('DD/MM/YYYY HH:mm')}
        </Description>
        <Description term="Duração">
          {moment(ted.startline).format('DD/MM/YYYY')}
          {' ~ '}
          {moment(ted.deadline).format('DD/MM/YYYY')}
        </Description>
        <Description term="Descrição">
          <Ellipsis lines={2}>{ted.description}</Ellipsis>
        </Description>
        <Description term="Criado por">
          <Avatar src={ted.creator.pictureUrl} size="small" /> {ted.creator.name}
        </Description>
      </DescriptionList>
    );

    return (
      <PageHeaderWrapper title={ted.name} action={action} content={description}>
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default ViewTed;
