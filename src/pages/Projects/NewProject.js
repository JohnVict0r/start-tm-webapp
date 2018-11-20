import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Form, Card, Button, Select } from 'antd';
import { formatMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Link from 'umi/link';
import { masterOfTeamsSelector } from '@/selectors/teams';

@connect(state => ({
  teams: masterOfTeamsSelector(state),
  proejcts: state.saveProject,
  loadingTeamOptions: state.loading.effects['teams/fetchUserMasterOfTeams'],
  submitting: state.loading.effects['saveProject/save'],
}))
@Form.create()
class NewProject extends PureComponent {
  componentDidMount() {
    const {
      location: { state },
      dispatch,
      form,
    } = this.props;

    dispatch({
      type: 'teams/fetchUserMasterOfTeams',
    });

    const owner = state && state.owner;
    if (owner) {
      form.setFieldsValue({ owner });
    }
  }

  componentDidUpdate(prevProps) {
    const { form, proejcts } = this.props;

    if (prevProps.proejcts !== proejcts && proejcts.error) {
      const { errors } = proejcts.error;
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
          type: 'saveProject/save',
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
      teams,
      loadingTeamOptions,
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
      <PageHeaderWrapper title="Novo projeto">
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
                <Select placeholder="Equipe" disabled={loadingTeamOptions}>
                  {teams.map(r => (
                    <Select.Option key={r.id}>{r.name}</Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Nome do projeto" {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Por favor informe o nome do projeto!' }],
              })(<Input maxLength={255} placeholder="Insita o nome do projeto" />)}
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
                  maxLength={255}
                  rows={4}
                  placeholder="Por favor, insira uma descrição para o projeto"
                />
              )}
            </Form.Item>
            <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                {formatMessage({ id: 'app.project.create' })}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NewProject;
