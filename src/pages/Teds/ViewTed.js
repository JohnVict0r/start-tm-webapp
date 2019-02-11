import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
// import Link from 'umi/link';
import {
  // List, Card, Skeleton,
  Button,
  Dropdown,
  Icon,
  Menu,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
// import { exploreProjectsSelector } from '../Projects/selectors/projects';

import styles from './TedsList.less';

const { Description } = DescriptionList;

const tabList = [
  {
    key: 'metas',
    tab: 'Metas',
  },
  {
    key: 'atividades',
    tab: 'Atividades',
  },
  {
    key: 'acoes',
    tab: 'Ações',
  },
];

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

@connect()
//   state => ({
//   // projects: exploreProjectsSelector(state),
//   // loading: state.loading.effects['projects/fetchUserProjects'],
// })
class ViewTed extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'projects/fetchUserProjects',
    });
  }

  render() {
    // const {
    //   // projects: { items, pagination },
    //   // loading,
    // } = this.props;

    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="Criado por">Karilany Coutinho</Description>
        <Description term="Criado em">25/12/2018</Description>
        <Description term="Duração">01/01/2019 ~ 31/12/2019</Description>
        <Description term="Descrição">
          Est similique illum occaecati. Laboriosam ut esse quia. Omnis expedita laudantium harum.
        </Description>
      </DescriptionList>
    );

    return (
      <PageHeaderWrapper title="TED 53" tabList={tabList} action={action} content={description}>
        {/* <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="Minhas TED's"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={items}
              renderItem={item => (
                <List.Item>
                  <Skeleton title={false} loading={loading} active>
                    <List.Item.Meta
                      title={
                        <Link to={`/projects/${item.id}`}>
                          {item.owner.name}
                          {' / '}
                          {item.name}
                        </Link>
                      }
                      description={item.description}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Card>
        </div> */}
      </PageHeaderWrapper>
    );
  }
}

export default ViewTed;
