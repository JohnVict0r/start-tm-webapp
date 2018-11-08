import React, { PureComponent } from 'react';
import { Input, Form, Card, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage } from 'umi/locale';

@Form.create()
class NewWorkflow extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'projects/createProject',
          payload: {
            teamId: values.owner,
            project: {
              ...values,
              owner_type: 'teams',
              owner_id: values.owner,
            },
          },
        });
        form.resetFields();
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
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
                <Input
                  placeholder={formatMessage({ id: 'app.admin.workflows.description-placeholder' })}
                />
              )}
            </Form.Item>
            <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
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
