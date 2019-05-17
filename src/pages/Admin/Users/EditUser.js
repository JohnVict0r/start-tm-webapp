import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Form, Card, Button, Select } from 'antd';

import { userUpdateSelector } from './selectors/users';
import { systemRolesSelector } from '@/selectors/global';
import PageLoading from '@/components/PageLoading';

@connect(state => {
  return {
    user: userUpdateSelector(state),
    roles: systemRolesSelector(state),
    submitting: state.loading.effects['updateUser/fetchUser'],
  };
})
@Form.create()
class EditUser extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'updateUser/fetchUser',
      payload: {
        id: match.params.userId,
      },
    });
    dispatch({
      type: 'global/fetchRoles',
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, user } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'admin/updateUserRole',
          payload: {
            userId: user.id,
            role: values.role,
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      user,
      roles,
      submitting,
    } = this.props;

    if (!user) {
      return <PageLoading />;
    }

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
      <Card title="Editar entregável" bordered={false}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Form.Item label="Nome do Usuário:" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Por favor informe o nome!' }],
              initialValue: user.name,
            })(<Input disabled={true} maxLength={255} placeholder="Nome do entregável" />)}
          </Form.Item>
          <Form.Item label="Email:" {...formItemLayout}>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Por favor informe o descrição!' }],
              initialValue: user.email,
            })(<Input disabled={true} maxLength={255} placeholder="Descricão do entregável" />)}
          </Form.Item>
          <Form.Item label="Papel do usuário:" {...formItemLayout}>
            {getFieldDecorator('role', {
              rules: [{ required: true, message: 'Por favor informe o descrição!' }],
              initialValue: user.role && user.role.name,
            })(
              <Select style={{ width: 140 }}>
                {roles.map(r => (
                  <Select.Option key={r.name} value={r.name}>
                    {` ${r.name} `}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Editar entregável
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default EditUser;
