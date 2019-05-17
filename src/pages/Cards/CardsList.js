import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { List, Card, Skeleton, Form, Badge, Select, Row, Col } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import { statusSelector } from '@/selectors/global';

const initialQuery = {
  status: ['status.todo', 'status.doing', 'status.paused'],
  sort: "created"
};


@connect(state => ({
  status: statusSelector(state),
  cards: state.mycards.cards,
  pagination: state.mycards.pagination,
  loading: state.loading.effects['mycards/fetch'],
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    dispatch({
      type: 'mycards/fetch',
      payload: {
        query: allValues
      },
    });
  },
})
class CardsList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchStatus',
    });

    dispatch({
      type: 'mycards/fetch',
      payload: {
        query: initialQuery
      },
    });
  }

  handleChangePage = page => {
    const { dispatch, form } = this.props;
    const query = form.getFieldsValue();

    dispatch({
      type: 'mycards/fetch',
      payload: {
        query: {
          ...query,
          page
        }
      },
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      status,
      cards,
      pagination,
      loading,
    } = this.props;

    const paginationProps = {
      current: pagination.currentPage,
      pageSize: pagination.perPage,
      total: pagination.total,
      hideOnSinglePage: true,
      onChange: page => {
        this.handleChangePage(page);
      },
    };

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
      },
    };

    if (status.length === 0) {
      return null;
    }

    return (
      <PageHeaderWrapper title="Minhas Tarefas">
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="Status" block style={{ paddingBottom: 11 }}>
              <Form.Item>
                {getFieldDecorator('status', {
                  initialValue: initialQuery.status
                })(
                  <TagSelect actionsText={{ selectAllText: 'Todos' }}>
                    {status.map(s => (
                      <TagSelect.Option key={s.id} value={s.name}>
                        <Badge color={s.color} /> {s.displayName}
                      </TagSelect.Option>
                    ))}
                  </TagSelect>
                )}
              </Form.Item>
            </StandardFormRow>
            <StandardFormRow grid last>
              <Row gutter={16}>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <Form.Item {...formItemLayout} label="Ordernar">
                    {getFieldDecorator('sort', {
                      initialValue: initialQuery.sort
                    })(
                      <Select placeholder="Ordernar por" style={{ maxWidth: 200, width: '100%' }}>
                        <Select.Option value="created">Data de criação</Select.Option>
                        <Select.Option value="updated">Data de atualização</Select.Option>
                        <Select.Option value="due">Data de entrega</Select.Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <Card
          style={{ marginTop: 24 }}
          bordered={false}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <List
            size="large"
            rowKey="id"
            loading={loading}
            pagination={paginationProps}
            dataSource={cards}
            renderItem={item => (
              <List.Item>
                <Skeleton title={false} loading={loading} active>
                  <List.Item.Meta
                    title={<Link to={`/teams/${item.team.id}/board/cards/${item.id}`}>{item.name}</Link>}
                    description={`${item.project.name} / ${item.team.name}`}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CardsList;
