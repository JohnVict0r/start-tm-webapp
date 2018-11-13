import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Form, Card, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage } from 'umi/locale';

@connect(state => ({
  createForm: state.createWorkflows.createForm,
  submitting: state.loading.effects['workflows/createWorkflow'],
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
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'workflows/createWorkflow',
          payload: values,
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

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'app.admin.workflows.new' })} hiddenBreadcrumb>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <Form.Item
              label={formatMessage({ id: 'app.admin.workflows.name' })}
              {...formItemLayout}
            >
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
            <Form.Item
              label={formatMessage({ id: 'app.admin.workflows.description' })}
              {...formItemLayout}
            >
              {getFieldDecorator('description', {
                rules: [{ required: false }],
              })(
                <Input.TextArea
                  rows={4}
                  maxLength={255}
                  placeholder={formatMessage({ id: 'app.admin.workflows.description-placeholder' })}
                />
              )}
            </Form.Item>
            <Form.Item style={{ marginTop: 32 }} {...submitFormLayout}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                {formatMessage({ id: 'app.admin.workflows.create' })}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NewWorkflow;
