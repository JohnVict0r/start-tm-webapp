import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Form, Card, Button, Select } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Link from 'umi/link';
import { masterOfTeamsSelector } from '@/selectors/teams';

@connect(state => ({
  teams: masterOfTeamsSelector(state),
  loadingTeamOptions: state.loading.effects['teams/fetchUserMasterOfTeams'],
}))
@Form.create()
class NewProject extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'teams/fetchUserMasterOfTeams',
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      teams,
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
      <PageHeaderWrapper title="Novo projeto" content="Crie um novo projeto">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <Form.Item
              label="Equipe"
              {...formItemLayout}
              help={
                <span>
                  Não tem uma equipe? <Link to="/teams/new">Crie uma.</Link>
                </span>
              }
            >
              {getFieldDecorator('owner', {
                rules: [{ required: true, message: 'Por favor selecione uma equipe!' }],
              })(
                <Select placeholder="Equipe">
                  {teams.map(r => (
                    <Select.Option key={r.id}>{r.name}</Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Nome do projeto" {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Por favor informe o nome do projeto!' }],
              })(<Input placeholder="Insita o nome do projeto" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Descrição">
              {getFieldDecorator('description', {
                rules: [
                  {
                    message: 'Por favor, insira uma descrição com pelo menos 5 caracteres',
                    min: 5,
                  },
                ],
              })(
                <Input.TextArea
                  rows={4}
                  placeholder="Por favor, insira uma descrição para o projeto"
                />
              )}
            </Form.Item>
            <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                Criar projeto
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NewProject;
