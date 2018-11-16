import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input, Button, Card, Form, Row, Col } from 'antd';
import { formatMessage } from 'umi/locale';

@connect(state => ({
  createForm: state.createWorkflows.createForm,
  submitting: state.loading.effects['workflows/NewWorkflow'],
}))
@Form.create()
class NewWorkflow extends PureComponent {
  componentDidUpdate(prevProps) {
    const { form, createForm } = this.props;

    if (prevProps.createForm !== createForm && createForm.error) {
      const { errors } = createForm.error;
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
    const { form } = this.props;
    let { owner } = this.props;

    if (!owner) {
      owner = {
        type: 'admin',
      };
    }

    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'createWorkflows/createWorkflow',
          payload: {
            owner,
            values,
          },
        });

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
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={16}>
          <Col lg={9} md={24}>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.admin.workflows.name-message' }),
                  },
                ],
              })(
                <Input
                  maxLength={255}
                  placeholder={formatMessage({ id: 'app.admin.workflows.name-placeholder' })}
                />
              )}
            </Form.Item>
          </Col>
          <Col lg={12} md={24}>
            <Form.Item>
              {getFieldDecorator('description', {
                rules: [{ required: false }],
              })(
                <Input
                  maxLength={255}
                  placeholder={formatMessage({ id: 'app.admin.workflows.description-placeholder' })}
                />
              )}
            </Form.Item>
          </Col>
          <Col lg={3} md={24}>
            <Form.Item>
              <Button block type="primary" htmlType="submit" loading={submitting}>
                {formatMessage({ id: 'app.admin.workflows.create' })}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default NewWorkflow;
