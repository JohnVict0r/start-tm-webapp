import React, { PureComponent } from 'react';
import { Button, Form, Input } from 'antd';
import { formatMessage } from 'umi/locale';

class TeamForm extends PureComponent {
  static defaultProps = {
    current: {},
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
      current,
      onSubmit,
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
      <Form onSubmit={onSubmit}>
        <Form.Item label={formatMessage({ id: 'app.team.teamname' })} {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: formatMessage({ id: 'app.team.teamname.required' }) },
            ],
            initialValue: current.name,
          })(
            <Input
              maxLength={255}
              placeholder={formatMessage({ id: 'app.team.teamname.helper' })}
            />
          )}
        </Form.Item>
        <Form.Item label={formatMessage({ id: 'app.team.teamdescription' })} {...formItemLayout}>
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'app.team.teamdescription.required' }),
              },
            ],
            initialValue: current.description,
          })(
            <Input
              maxLength={255}
              placeholder={formatMessage({ id: 'app.team.teamdescription.helper' })}
            />
          )}
        </Form.Item>
        <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            {formatMessage({ id: current.id ? 'app.team.editteam' : 'app.team.newteam' })}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default TeamForm;
