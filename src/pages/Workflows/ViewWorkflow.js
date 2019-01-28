import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';

import { Popover, Card, Form, Table, Divider, Tag, Icon } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';

import styles from './ViewWorkflow.less';
import NewWorkflowNode from './NewWorkflowNode';
import NewWorkflowTransition from './NewWorkflowTransition';

const columns = [{
  title: 'Etapa',
  dataIndex: 'node',
  key: 'node'
}, {
  title: 'Transições',
  dataIndex: 'trasitions',
  key: 'transitions',
  render: transitions  => (
    <span>
      {transitions.map(transition => <Tag color="blue" key={transition}>{'>>>'}{transition}</Tag>)}
    </span>
  ),
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
}, {
  title: 'Criar Card?',
  key: 'cardManager',
  dataIndex: 'cardManager',
  align: 'center',
  render: cardManager => (
    (cardManager==='true') ? (
      <Icon type="check" />
    ) : (
      <Icon type="close" />
    )
  ),
}, {
  title: 'Action',
  key: 'action',
  align: 'center',
  render: () => (
    <span>
      <a href="">Editar</a>
      <Divider type="vertical" />
      <a href="">Delete</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  node: 'em espera',
  trasitions: ['feito', 'fazendo'],
  status: 'A fazer',
  cardManager: 'true',
}, {
  key: '2',
  node: 'fazendo',
  trasitions: ['em espera', 'feito'],
  status: 'Fazendo',
  cardManager: 'true',
}, {
  key: '3',
  node: 'feito',
  trasitions: [],
  status: 'Feito',
  cardManager: 'false',
}];

@connect((state, ownProps) => ({
  workflow: state.entities.workflows[ownProps.match.params.id],
  loading: state.loading.effects['workflows/fetchWorkflow'],
}))
@Form.create()
class ViewWorkflow extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'workflows/fetchWorkflow',
      payload: match.params.id,
    });
  }

  render() {
    const { workflow, match, form } = this.props;

    if (!workflow) {
      return <PageLoading />;
    }

    const content = (
      <div className={styles.optionsBar}>
        <div className={styles.left}>
          <div className={styles.title}>
            <Popover
              title="Descrição do fluxo de trabalho"
              overlayClassName={styles.descriptionPopover}
              content={workflow.description ? workflow.description : 'Não possui descrição'}
              mouseEnterDelay={1}
            >
              <Link to={`${match.url}`}>
                <Ellipsis lines={1}>
                  {workflow.name}
                </Ellipsis>
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    );

    /*
    const extraContent = (
      <div className={styles.extraContent}>
        <Button type="primary" icon="plus" onClick={() => router.push(`/workflows/${match.params.id}/step`)}>
          Etapa
        </Button>
        <Button type="primary" icon="plus" onClick={() => router.push(`/workflows/${match.params.id}/transition`)}>
          Transição
        </Button>
      </div>
    );
    */

    return (
      <Fragment>
        <PageHeaderWrapper hiddenBreadcrumb content={content}>
          <Card
            bordered={false}
            title="Adicionar Etapas"
            style={{ marginTop: 24 }}
          >
            <NewWorkflowNode
              form={form}
              onSubmit={this.handleSubmit}
            />
          </Card>
          <Card
            bordered={false}
            title="Adicionar Transição"
            style={{ marginTop: 24 }}
          >
            <NewWorkflowTransition
              form={form}
              onSubmit={this.handleSubmit}
            />
          </Card>
          <Card
            className={styles.standardList}
            bordered={false}
            title="Etapas"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
            <Table style={{ marginTop: 24 }} columns={columns} dataSource={data} />
          </Card>
        </PageHeaderWrapper>
      </Fragment>
    );
  }
}

export default ViewWorkflow;
