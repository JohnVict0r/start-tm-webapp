import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import router from 'umi/router';
import Link from 'umi/link';
import { List, Card } from 'antd';
// import Authorized from '@/utils/Authorized';
// import getPaginationProps from '@/utils/getPaginationProps';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './EventsList.less';

@connect((state, ownProps) => ({
  event: state.entities.events[ownProps.match.params.eventId],
}))
class EventCategories extends PureComponent {
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'event/fetchFederations',
  //   });
  // }

  render() {
    const { event } = this.props;

    const EventCategoriesItem = ({ category }) => {
      return (
        <List.Item>
          <List.Item.Meta
            title={<Link to={`/category/${category.id}`}>{category.name}</Link>}
            description={
              <>
                <div>
                  {`Modalidade: ${category.sex === 'M' ? 'Masculino' : 'Feminino'} - Tipo: ${
                    category.type
                  } `}{' '}
                </div>
                <div>
                  {`${category.type === 'RAT' ? 'Pontos' : 'Idade(Anos)'}: ${
                    category.downLimit
                  } - ${category.upperLimit}`}{' '}
                </div>
              </>
            }
          />
        </List.Item>
      );
    };

    return (
      <PageHeaderWrapper
        title="Categorias"
        // extra={
        //   <Authorized authority={['Administrator']}>
        //     <Button type="primary" icon="plus" onClick={() => router.push('/federations/new')}>
        //       Categoria
        //     </Button>
        //   </Authorized>
        // }
      >
        <div className={styles.standardList}>
          <Card className={styles.listCard} bordered={false}>
            <List
              size="large"
              rowKey="id"
              // loading={loadingFederations}
              // pagination={getPaginationProps(meta)}
              dataSource={event.championships}
              renderItem={item => <EventCategoriesItem category={item} />}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default EventCategories;
