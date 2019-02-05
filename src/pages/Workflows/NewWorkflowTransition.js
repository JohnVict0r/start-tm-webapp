import React, { PureComponent } from 'react';
import _ from 'lodash';
import fp from 'lodash/fp';
import { Form, Button, Row, Col, Select, notification } from 'antd';
import { formatMessage } from 'umi/locale';

import styles from './NewWorkflowTransition.less';

@Form.create()
class NewWorkflowTransition extends PureComponent {
  state = {
    selectedNodeOut: false,
    inWorkflowNodeOptions: [],
  };

  componentDidUpdate(prevProps) {
    const { form, validation } = this.props;

    if (prevProps.validation !== validation) {
      const { errors } = validation;
      const mapErrors = Object.keys(errors).reduce(
        (accum, key) => ({
          ...accum,
          [key]: {
            value: form.getFieldValue(key),
            errors: errors[key].map(err => new Error(err)),
          },
        }),
        {}
      );

      form.setFields(mapErrors);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        onSubmit(err, values);
        form.resetFields();
      }
    });
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

    if (tts.length >= 4) {
      this.setState({
        selectedNodeOut: false,
      });
      notification.warning({ message: 'Esta etapa de saída não possui opções de entrada' });
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
      buttonValue,
      nodes,
    } = this.props;

    const { selectedNodeOut, inWorkflowNodeOptions } = this.state;

    const { Option } = Select;

    return (
      <Form onSubmit={this.handleSubmit} className={styles.form}>
        <Row gutter={16}>
          <Col lg={9} md={24}>
            <Form.Item>
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
          </Col>
          <Col lg={12} md={24}>
            <Form.Item>
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
          </Col>
          <Col lg={3} md={24}>
            <Form.Item>
              <Button block type="primary" htmlType="submit" loading={submitting}>
                {buttonValue}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default NewWorkflowTransition;
