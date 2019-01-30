import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';

import { Popover, Card, Table, Divider, Tag, Icon, Popconfirm } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';

import styles from './ViewWorkflow.less';
import NewWorkflowNode from './NewWorkflowNode';
import NewWorkflowTransition from './NewWorkflowTransition';
import { makeWorkflowsSelector } from './selectors/workflows';
import { makeStatus } from './selectors/status';

@connect((state, ownProps) => {
  const workflowSelector = makeWorkflowsSelector({ workflowId: ownProps.match.params.id });
  return {
    workflow: workflowSelector(state),
    status: makeStatus(state),
    loading: state.loading.effects['workflows/fetchWorkflow'],
  };
})
class ViewWorkflow extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'workflows/fetchWorkflow',
      payload: match.params.id,
    });
  }

  handleSubmitWorkflowNode = (err, values) => {
    if (!err) {
      const { dispatch, workflow } = this.props;
      dispatch({
        type: 'workflows/addWorkflowNode',
        payload: {
          id: workflow.id,
          node: values,
        },
      });
    }
  };

  handleSubmitWorkflowTransition = (err, values) => {
    console.log('chegou no handlesubmit');
    if (!err) {
      console.log('não teve erros!');
      const { dispatch, workflow } = this.props;
      dispatch({
        type: 'workflows/addWorkflowTransition',
        payload: {
          id: workflow.id,
          transition: values,
        },
      });
    }
  };

  handleDelete = nodeId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'workflows/deleteWorkflowNode',
      payload: {
        id: nodeId,
      },
    });
  };

  render() {
    const { workflow, match } = this.props;
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
                <Ellipsis lines={1}>{workflow.name}</Ellipsis>
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    );

    const columns = [
      {
        title: 'Etapa',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Transições',
        dataIndex: 'trasitions',
        key: 'transitions',
        render: transitions => (
          <span>
            {transitions.map(transition => (
              <Tag color="blue" key={transition}>
                {'>>>'}
                {transition}
              </Tag>
            ))}
          </span>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => <Tag color={status.color}>{status.displayName}</Tag>,
      },
      {
        title: 'Criar Card?',
        key: 'canCreateCard',
        dataIndex: 'canCreateCard',
        align: 'center',
        render: canCreateCard => (canCreateCard ? <Icon type="check" /> : <Icon type="close" />),
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: record => (
          <span>
            <a href="">Editar</a>
            <Divider type="vertical" />
            <Popconfirm
              title="Tem certeza?"
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              onConfirm={this.handleDelete(record.id)}
            >
              <a>Delete</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
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
          <Card bordered={false} title="Adicionar Etapas" style={{ marginTop: 24 }}>
            <NewWorkflowNode onSubmit={this.handleSubmitWorkflowNode} />
          </Card>
          <Card bordered={false} title="Adicionar Transição" style={{ marginTop: 24 }}>
            <NewWorkflowTransition
              nodes={workflow.nodes}
              onSubmit={this.handleSubmitWorkflowTransition}
            />
          </Card>
          <Card
            className={styles.standardList}
            bordered={false}
            title="Etapas"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
            <Table style={{ marginTop: 24 }} columns={columns} dataSource={workflow.list} />
          </Card>
        </PageHeaderWrapper>
      </Fragment>
    );
  }
}

export default ViewWorkflow;
