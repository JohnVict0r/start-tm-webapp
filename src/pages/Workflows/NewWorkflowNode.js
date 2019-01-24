import React, { PureComponent } from 'react';
import { Input, Form, Button, Row, Col, Checkbox, Select } from 'antd';
import { formatMessage } from 'umi/locale';

import styles from './NewWorkflowNode.less';

class NewWorkflowNode extends PureComponent {
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

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className={styles.form}>
        <Row gutter={16}>
          <Col lg={9} md={24}>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.workflow.form.node.name-message' }),
                  },
                ],
              })(
                <Input
                  maxLength={255}
                  placeholder={formatMessage({ id: 'app.workflow.form.node.name' })}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Checkbox
                onChange={this.handleChange}
              >
                {formatMessage({ id: 'app.workflow.form.node.check' })}
              </Checkbox>
            </Form.Item>
          </Col>
          <Col lg={12} md={24}>
            <Form.Item>
              {getFieldDecorator('status', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.workflow.form.node.status-message' }),
                  },
                ],
              })(
                <Select
                  placeholder={formatMessage({ id: 'app.workflow.form.node.status' })}
                  onChange={this.handleSelectChange}
                >
                  <Select.Option value="a">A fazer</Select.Option>
                  <Select.Option value="b">Fazendo</Select.Option>
                  <Select.Option value="c">Feito</Select.Option>
                  <Select.Option value="d">Pausado</Select.Option>
                  <Select.Option value="e">Cancelado</Select.Option>
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

export default NewWorkflowNode;
