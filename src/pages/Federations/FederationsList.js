import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { Avatar, Button, List, Card, Skeleton } from 'antd';
import Authorized from '@/utils/Authorized';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './FederationsList.less';

@connect(state => ({
  loading: state.loading.effects['teams/fetchUserTeams'],
}))
class ClubsList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'teams/fetchUserTeams',
    });
  }

  render() {
    const {
      // federations: { items, pagination },
      loading,
    } = this.props;

    // const paginationProps = {
    //   current: pagination.currentPage,
    //   pageSize: pagination.perPage,
    //   total: pagination.total,
    //   hideOnSinglePage: true,
    // };

    return (
      <PageHeaderWrapper 
        title="Minhas Federações" 
        extra={
          <Authorized authority={['Administrador']}>
            <Button type="primary" icon="plus" onClick={() => router.push('/federations/new')}>
              Federação
            </Button>
          </Authorized>
        }>
        <div className={styles.standardList}>
          <Card className={styles.listCard} bordered={false}>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              // pagination={paginationProps}
              // dataSource={items}
              // renderItem={item => (
              //   <List.Item>
              //     <Skeleton title={false} loading={loading} active>
              //       <List.Item.Meta
              //         avatar={<Avatar shape="square" src={item.project.avatar} />}
              //         title={
              //           <>
              //             {item.project.name}
              //             <span className={styles.separator}>/</span>
              //             <Link to={`/federations/${item.id}/board`}>{item.name}</Link>
              //           </>
              //         }
              //         description={item.description}
              //       />
              //     </Skeleton>
              //   </List.Item>
              // )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ClubsList;
