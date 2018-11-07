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

    return (
      <PageHeaderWrapper
        title={formatMessage({ id: 'app.admin.workflows.new' })}
        content={formatMessage({ id: 'app.admin.workflows.context' })}
      >
        <Card bordered={false}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <Form.Item label={formatMessage({ id: 'app.admin.workflows.name' })}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.admin.workflows.name-message' }, {}),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({ id: 'app.admin.workflows.name-placeholder' })}
                />
              )}
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'app.admin.workflows.description' })}>
              {getFieldDecorator('descricao', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({ id: 'app.admin.workflows.description-placeholder' })}
                />
              )}
            </Form.Item>
            <Button type="primary" htmlType="submit">
              {formatMessage({ id: 'app.admin.workflows.create' })}
            </Button>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NewWorkflow;
