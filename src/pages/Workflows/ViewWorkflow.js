import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'dva';
import Link from 'umi/link';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { Popover, Button } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import WorkflowNodeForm from '@/components/Modal/WorkflowNodeForm';
import WorkflowTransitionForm from '@/components/Modal/WorkflowTransitionForm';

import WorkflowNode from '@/components/Workflow/WorkflowNode';

import styles from './ViewWorkflow.less';
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
    visibleWorkflowNodeModal: false,
    visibleWorkflowTransitionModal: false,
    currentWorkflowNode: {},
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
          <Button type="primary" icon="plus" onClick={this.showWorkflowNodeFormCreateModal}>
            Etapa
          </Button>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper hiddenBreadcrumb content={content}>
        <div className={styles.container}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Scrollbars className={styles.scroll}>
              <Droppable direction="horizontal" droppableId="NODE" type="NODE">
                {(dropProvided, dropSnapshot) => (
                  <div
                    className={classNames(styles.nodeList, {
                      [styles.dragging]: dropSnapshot.isDraggingOver,
                    })}
                    {...dropProvided.droppableProps}
                    ref={dropProvided.innerRef}
                  >
                    {workflow.list.map((node, index) => {
                      return (
                        <WorkflowNode
                          key={node.id}
                          index={index}
                          node={node}
                          onEdit={() => this.showWorkflowNodeFormModal(node)}
                          onDelete={() => this.handleDeleteNode(node.id)}
                          onAddTransation={this.showWorkflowTransitionFormModal}
                          onDeleteTransition={this.handleDeleteTransition}
                        />
                      );
                    })}
                    {dropProvided.placeholder}
                  </div>
                )}
              </Droppable>
            </Scrollbars>
          </DragDropContext>
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
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ViewWorkflow;
