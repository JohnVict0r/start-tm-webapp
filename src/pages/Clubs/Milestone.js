import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  List,
  Row,
  Progress,
  Icon,
  Typography,
} from 'antd';
import Link from 'umi/link';

import { milestonesSelector } from './selectors/milestones';
import styles from './Milestone.less';

const ProgressMilestone = ({ progress }) => {
  const { total, complete } = progress
    .filter(i => i.name !== 'status.canceled')
    .reduce(
      (acc, i) => ({
        total: acc.total + i.count,
        complete: acc.complete + (i.name === 'status.done' ? i.count : 0),
      }),
      {
        total: 0,
        complete: 0,
      }
    );

  const result = (complete / total) * 100;

  return progress.length > 0 ? (
    <div className={styles.progress}>
      <Progress
        status="success"
        percent={parseFloat(result.toFixed(2))}
        format={percent => `${percent} %`}
      />
      <div>
        <Typography.Text strong>Total: </Typography.Text>
        {total}
        {' | '}
        <Typography.Text strong>Feitas: </Typography.Text>
        {complete}
      </div>
    </div>
  ) : (
    <div className={styles.progress}>
      <Progress percent={0} format={percent => `${percent} %`} />
      <div>
        <Typography.Text strong>Total: </Typography.Text>
        {total}
        {' | '}
        <Typography.Text strong>Feitas: </Typography.Text>
        {complete}
      </div>
    </div>
  );
};

const DescriptionMilestone = ({ data: { description, startline, deadline } }) => {
  return (
    <>
      <div>{description}</div>
      <div>
        <Icon type="clock-circle" />{' '}
        {`${moment(startline).format('DD/MM/YYYY')} ~ ${moment(deadline).format('DD/MM/YYYY')}`}
      </div>
    </>
  );
};

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

    return (
      <Row gutter={24} type="flex">
        <Col xl={16} lg={24} md={24} sm={24} xs={24} order={2}>
          <Card bordered={false} title="Entregáveis" loading={loading}>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              dataSource={milestones}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    style={{ flex: '1 0 300px' }}
                    title={<Link to={`/milestones/${item.id}`}>{item.name}</Link>}
                    description={<DescriptionMilestone data={item} />}
                  />
                  <ProgressMilestone progress={item.progress} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24} order={1}>
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
