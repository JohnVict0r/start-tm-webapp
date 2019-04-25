import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button, Card, Col, DatePicker, Form, Input, List, Row } from 'antd';

import { milestonesSelector } from './selectors/milestones';
import styles from './Milestone.less';

@connect(state => ({
  milestones: milestonesSelector(state),
  submitting: state.loading.effects['milestones/save'],
  loading: state.loading.effects['milestones/fetch'],
}))
@Form.create()
class Milestone extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'milestones/fetch',
      payload: {
        teamId: match.params.teamId,
      },
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, match } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        const [startline, deadline] = values.duration;
        dispatch({
          type: 'milestones/save',
          payload: {
            teamId: match.params.teamId,
            milestone: {
              ...values,
              startline,
              deadline,
            },
          },
        });
        form.resetFields();
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      milestones,
      loading,
      submitting,
    } = this.props;

    const ListContent = ({ data: { creator, startline, deadline } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Criado por</span>
          <p>{creator.name}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Início</span>
          <p>{moment(startline).format('DD/MM/YYYY')}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Fim</span>
          <p>{moment(deadline).format('DD/MM/YYYY')}</p>
        </div>
      </div>
    );

    return (
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card bordered={false} title="Entregáveis" loading={loading}>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              dataSource={milestones}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta title={item.name} description={item.description} />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{ marginBottom: 24 }}
            className={styles.standardListForm}
            title="Novo Entregável"
            bordered={false}
          >
            <Form onSubmit={this.handleSubmit} layout="vertical" hideRequiredMark>
              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Por favor informe o nome!' }],
                })(<Input maxLength={255} placeholder="Nome do entregável" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: 'Por favor informe o descrição!' }],
                })(<Input.TextArea maxLength={255} placeholder="Descricão do entregável" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('duration', {
                  rules: [{ required: true, message: 'Por favor informe os prazos!' }],
                })(<DatePicker.RangePicker format="DD/MM/YYYY" />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary" block htmlType="submit" loading={submitting}>
                  Criar Entregável
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Milestone;
