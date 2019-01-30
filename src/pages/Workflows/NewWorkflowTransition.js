import React, { PureComponent } from 'react';
import { Form, Button, Row, Col, Select } from 'antd';
import { formatMessage } from 'umi/locale';

import styles from './NewWorkflowTransition.less';

@Form.create()
class NewWorkflowTransition extends PureComponent {
  state = {
    selectedNodeOut: false,
    nodeout: [],
    nodein: [],
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
    if (value) {
      this.setState({
        selectedNodeOut: true,
        nodeout: value,
      });
    }
  };

  handleSelectChangeNodeIn = value => {
    if (value) {
      this.setState({ nodein: value });
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
      nodes,
    } = this.props;

    const { nodein, nodeout, selectedNodeOut } = this.state;

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
                  {nodes
                    .filter(item => item.id !== nodein)
                    .map(node => (
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
                  {nodes
                    .filter(item => item.id !== nodeout)
                    .map(node => (
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
                {formatMessage({ id: 'form.create' })}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default NewWorkflowTransition;
