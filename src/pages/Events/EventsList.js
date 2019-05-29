import React, { PureComponent } from 'react';
// import { connect } from 'dva';
import router from 'umi/router';
// import Link from 'umi/link';
import { List, Card, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './EventsList.less';

class EventsList extends PureComponent {
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'projects/fetchUserProjects',
  //   });
  // }

  render() {
    const {
      // projects: { items, pagination },
      // loading,
    } = this.props;

    // const paginationProps = {
    //   current: pagination.currentPage,
    //   pageSize: pagination.perPage,
    //   total: pagination.total,
    //   hideOnSinglePage: true,
    // };

    return (
      <PageHeaderWrapper
        title="Meus Eventos"
        extra={
          <Authorized authority={['Administrador', 'Gerente']}>
            <Button type="primary" icon="plus" onClick={() => router.push('/events/new')}>
              Evento
            </Button>
          </Authorized>
        }
      >
        <div className={styles.standardList}>
          <Card className={styles.listCard} bordered={false}>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              // dataSource={items}
              renderItem={item => (
                <List.Item>
                  <Skeleton title={false} loading={loading} active>
                    <List.Item.Meta
                      avatar={<Avatar shape="square" src={item.avatar} />}
                      title={<Link to={`/projects/${item.id}`}>{item.name}</Link>}
                      description={item.description}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default EventsList;
