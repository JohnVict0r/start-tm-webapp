import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';

import { Popover, Card, Table, Divider, Tag, Icon, Popconfirm, Modal} from 'antd';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';

import styles from './ViewWorkflow.less';
import NewWorkflowNode from './NewWorkflowNode';
import NewWorkflowTransition from './NewWorkflowTransition';
import { makeWorkflowsSelector } from './selectors/workflows';
import { statusSelector } from '@/selectors/global';

@connect((state, ownProps) => {
  const workflowSelector = makeWorkflowsSelector({ workflowId: ownProps.match.params.id });
  return {
    workflow: workflowSelector(state),
    statusArray: statusSelector(state),
    loading: state.loading.effects['workflows/fetchWorkflow'],
  };
})
class ViewWorkflow extends Component {
  state = {
    visible: false
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'workflows/fetchWorkflow',
      payload: match.params.id,
    });
    dispatch({
      type: 'global/fetchStatus',
    });
  }

  showModal = (node) => {
    console.log(node);
    this.setState({
      visible: true,
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
    if (!err) {
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

  handleDeleteNode = nodeId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'workflows/deleteWorkflowNode',
      payload: {
        id: nodeId,
      },
    });
  };

  handleDeleteTransition = transitionId => {
    const { dispatch } = this.props;

    dispatch({
      type: 'workflows/deleteWorkflowTransition',
      payload: {
        id: transitionId,
      },
    });
  };

  render() {
    const { workflow, statusArray, match } = this.props;
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
        dataIndex: 'transitions',
        key: 'transitions',
        render: transitions => (
          <span>
            {transitions.map(transition => (
              <div key={transition.id}>
                <Tag
                  closable
                  onClose={() => this.handleDeleteTransition(transition.id)}
                  color="blue"
                >
                  {'>>> '}
                  {transition.name}
                </Tag>
              </div>
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
        dataIndex: 'canCreateCard',
        key: 'canCreateCard',
        align: 'center',
        render: canCreateCard => (canCreateCard ? <Icon type="check" /> : null),
      },
      {
        title: 'Ação',
        key: 'action',
        align: 'center',
        render: record => (
          <span>
            <a onClick={() => this.showModal(record)}>Editar</a>
            <Divider type="vertical" />
            <Popconfirm
              title="Tem certeza?"
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              onConfirm={() => this.handleDeleteNode(record.id)}
            >
              <a>Delete</a>
            </Popconfirm>
          </span>
        ),
      },
    ];

    return (
      <PageHeaderWrapper hiddenBreadcrumb content={content}>
        <Card bordered={false} title="Adicionar Etapas" style={{ marginTop: 24 }}>
          <NewWorkflowNode
            onSubmit={this.handleSubmitWorkflowNode}
            status={statusArray}
            buttonValue="Adicionar"
          />
        </Card>
        {workflow.nodes.length > 1 ? (
          <Card bordered={false} title="Adicionar Transição" style={{ marginTop: 24 }}>
            <NewWorkflowTransition
              nodes={workflow.nodes}
              transitions={workflow.transitions}
              onSubmit={this.handleSubmitWorkflowTransition}
              buttonValue="Adicionar"
            />
          </Card>
        ) : null
        }
        <Card
          className={styles.standardList}
          bordered={false}
          title="Etapas"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
        >
          <Table
            style={{ marginTop: 24 }}
            columns={columns}
            dataSource={workflow.list}
            rowKey={record => record.id}
          />
        </Card>
        <Modal
          title="Alterar Etapa"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <NewWorkflowNode
            onSubmit={this.handleSubmitWorkflowNode}
            status={statusArray}
            buttonValue="Adicionar"
          />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default ViewWorkflow;
