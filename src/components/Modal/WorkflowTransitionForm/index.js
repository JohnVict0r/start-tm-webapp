import { Modal, Form, Select, notification } from 'antd';
import { formatMessage } from 'umi/locale';
import React from 'react';
import _ from 'lodash';
import fp from 'lodash/fp';

const WorkflowTransitionForm = Form.create({ name: 'form_workflow_transition_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    state = {
      selectedNodeOut: false,
      inWorkflowNodeOptions: [],
    };

    handleSelectChangeNodeOut = value => {
      const { nodes, transitions, form } = this.props;

      // transição do qual o nó selecionado é o de saída
      const tts = _.filter(transitions, t => t.outWorkflowNodeId === value);

      // filtra os nós que não tem transição com o nó selecionado
      const inWorkflowNodeOptions = fp.compose(
        fp.filter(node => node.id !== value),
        fp.filter(node => !_.some(tts, { inWorkflowNodeId: node.id }))
      )(nodes);

      this.setState({
        selectedNodeOut: true,
        inWorkflowNodeOptions,
      });

      form.setFields({
        in_workflow_node_id: {
          value: [],
        },
      });

      if (inWorkflowNodeOptions.length === 0) {
        this.setState({
          selectedNodeOut: false,
        });
        notification.warning({ message: 'Esta etapa de saída não possui opções de entrada' });
      }
    };

    handleSubmit = e => {
      e.preventDefault();
      const { form, onCreate } = this.props;
      form.validateFields({ force: true }, (err, values) => {
        if (err) {
          return;
        }
        onCreate(err, values);
        form.resetFields();
        this.setState({
          selectedNodeOut: false,
        });
      });
    };

    render() {
      const { visible, onCancel, form, nodes } = this.props;

      const { getFieldDecorator } = form;

      const { selectedNodeOut, inWorkflowNodeOptions } = this.state;

      const { Option } = Select;

      return (
        <Modal
          visible={visible}
          title="Adicionar Transição"
          okText="Adicionar"
          onCancel={onCancel}
          onOk={this.handleSubmit}
        >
          <Form layout="vertical">
            <Form.Item label="Etapa de Saída">
              {getFieldDecorator('out_workflow_node_id', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.workflow.form.node.name-message' }),
                  },
                ],
              })(
                <Select
                  placeholder={formatMessage({ id: 'app.workflow.form.transition.nodeout' })}
                  onChange={this.handleSelectChangeNodeOut}
                >
                  {nodes.map(node => (
                    <Option value={node.id} key={node.id}>
                      {node.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Etapa de Entrada">
              {getFieldDecorator('in_workflow_node_id', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.workflow.form.node.status-message' }),
                  },
                ],
              })(
                <Select
                  placeholder={formatMessage({ id: 'app.workflow.form.transition.nodein' })}
                  onChange={this.handleSelectChangeNodeIn}
                  disabled={!selectedNodeOut}
                >
                  {inWorkflowNodeOptions.map(node => (
                    <Option value={node.id} key={node.id}>
                      {node.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);
export default WorkflowTransitionForm;
