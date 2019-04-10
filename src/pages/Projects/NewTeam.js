import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Form, Input } from 'antd';

@connect(state => ({
  validation: state.createTeam.validation,
  submitting: state.loading.effects['createTeam/create'],
}))
@Form.create()
class NewTeam extends PureComponent {
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
    const { form, match, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'createTeam/create',
          payload: {
            projectId: match.params.projectId,
            team: values,
          },
        });
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
      <Card bordered={false} title="Nova Equipe">
        <Form onSubmit={this.handleSubmit} hideRequiredMark>
          <Form.Item label="Nome da equipe" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Por favor informe o nome da equipe!' }],
            })(<Input maxLength={255} placeholder="Insita o nome da equipe" />)}
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
                placeholder="Por favor, insira uma descrição para a equipe"
              />
            )}
          </Form.Item>
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" disabled={submitting} loading={submitting}>
              Criar Equipe
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default NewTeam;
