import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

import { Popover, Card, Table, Divider, Tag, Icon, Popconfirm, Button } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import WorkflowNodeForm from '@/components/Modal/WorkflowNodeForm';
import WorkflowTransitionForm from '@/components/Modal/WorkflowTransitionForm';

import styles from './ViewWorkflow.less';
import { makeWorkflowsSelector } from './selectors/workflows';
import { statusSelector } from '@/selectors/global';

const DrappableBody = ({ children, ...rest }) => (
  <Droppable droppableId="NODE" type="NODE">
    {dropProvided => (
      <tbody {...dropProvided.droppableProps} ref={dropProvided.innerRef} {...rest}>
        {React.Children.map(children, child => child)}
        {dropProvided.placeholder}
      </tbody>
    )}
  </Droppable>
);

const DraggableRow = ({ node, index, ...rest }) => (
  <Draggable key={node.id} draggableId={node.id} index={index}>
    {(provided, snapshot) => (
      <NaturalDragAnimation style={provided.draggableProps.style} snapshot={snapshot}>
        {style => (
          <tr
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            {...rest}
            style={style}
          />
        )}
      </NaturalDragAnimation>
    )}
  </Draggable>
);

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
    visibleWorkflowNodeModal: false,
    visibleWorkflowTransitionModal: false,
    currentWorkflowNode: {},
  };

  components = {
    body: {
      wrapper: DrappableBody,
      row: DraggableRow,
    },
  };

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

  showWorkflowNodeFormModal = node => {
    this.setState({
      currentWorkflowNode: node,
      visibleWorkflowNodeModal: true,
    });
  };

  showWorkflowNodeFormCreateModal = () => {
    this.setState({
      visibleWorkflowNodeModal: true,
    });
  };

  showWorkflowTransitionFormModal = () => {
    this.setState({
      visibleWorkflowTransitionModal: true,
    });
  };

  handleSubmitWorkflowNode = (err, values) => {
    if (err) {
      return;
    }

    const { dispatch, workflow } = this.props;
    const { currentWorkflowNode } = this.state;

    if (!currentWorkflowNode.id) {
      dispatch({
        type: 'workflows/addWorkflowNode',
        payload: {
          id: workflow.id,
          node: values,
        },
      });
    } else {
      dispatch({
        type: 'workflows/putWorkflowNode',
        payload: {
          id: currentWorkflowNode.id,
          node: values,
        },
      });
    }
    this.handleCancelNodeModal();
  };

  handleSubmitWorkflowTransition = (err, values) => {
    if (err) {
      return;
    }
    const { dispatch, workflow } = this.props;
    dispatch({
      type: 'workflows/addWorkflowTransition',
      payload: {
        id: workflow.id,
        transition: values,
      },
    });
    this.handleCancelTransitionModal();
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

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleCancelNodeModal = () => {
    this.setState({
      visibleWorkflowNodeModal: false,
      currentWorkflowNode: {},
    });
  };

  handleCancelTransitionModal = () => {
    this.setState({ visibleWorkflowTransitionModal: false });
  };

  onDragEnd = result => {
    console.log('passou em onDragEnd');
    console.log(result);
  };

  render() {
    const { workflow, statusArray, match } = this.props;
    const {
      currentWorkflowNode,
      visibleWorkflowNodeModal,
      visibleWorkflowTransitionModal,
    } = this.state;

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
            <a onClick={() => this.showWorkflowNodeFormModal(record)}>Editar</a>
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

    const extraTableOption = (
      <Button.Group>
        <Button type="primary" onClick={this.showWorkflowNodeFormCreateModal}>
          <Icon type="plus" />
          <span>Etapa</span>
        </Button>
        {workflow.nodes.length > 1 ? (
          <Button type="primary" onClick={this.showWorkflowTransitionFormModal}>
            <Icon type="plus" />
            <span>Transição</span>
          </Button>
        ) : null}
      </Button.Group>
    );

    return (
      <PageHeaderWrapper hiddenBreadcrumb content={content}>
        <Card
          className={styles.standardList}
          bordered={false}
          extra={extraTableOption}
          title="Etapas"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
        >
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Table
              style={{ marginTop: 24 }}
              pagination={false}
              columns={columns}
              components={this.components}
              onRow={(record, index) => ({
                index,
                node: record,
              })}
              dataSource={workflow.list}
              rowKey={record => record.id}
            />
          </DragDropContext>
        </Card>
        <WorkflowNodeForm
          status={statusArray}
          initialValues={currentWorkflowNode}
          wrappedComponentRef={this.saveFormRef}
          visible={visibleWorkflowNodeModal}
          onCancel={this.handleCancelNodeModal}
          onCreate={this.handleSubmitWorkflowNode}
        />
        <WorkflowTransitionForm
          nodes={workflow.nodes}
          transitions={workflow.transitions}
          wrappedComponentRef={this.saveFormRef}
          visible={visibleWorkflowTransitionModal}
          onCancel={this.handleCancelTransitionModal}
          onCreate={this.handleSubmitWorkflowTransition}
        />
      </PageHeaderWrapper>
    );
  }
}

export default ViewWorkflow;
