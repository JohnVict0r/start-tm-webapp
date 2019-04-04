import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Form, Input, Select } from 'antd';
import Link from 'umi/link';

@connect(state => ({
  workflows: state.createBoard.availableWorkflows.map(id => state.entities.workflows[id]),
  validation: state.createBoard.validation,
  submitting: state.loading.effects['createBoard/create'],
}))
@Form.create()
class NewBoard extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'createBoard/fetchAvailableWorkflows',
      payload: match.params.projectId,
    });
  }

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
          type: 'createBoard/create',
          payload: {
            projectId: match.params.projectId,
            board: values,
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      workflows,
      submitting,
      match,
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
      <Card bordered={false} title="Novo Quadro">
        <Form onSubmit={this.handleSubmit} hideRequiredMark>
          <Form.Item label="Nome do quadro" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Por favor informe o nome do quadro!' }],
            })(<Input maxLength={255} placeholder="Insita o nome do quadro" />)}
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
                placeholder="Por favor, insira uma descrição para o quadro"
              />
            )}
          </Form.Item>
          <Form.Item
            label="Fluxo de trabalho"
            {...formItemLayout}
            help={
              <span>
                Você também pode criar um novo fluxo de trabalho{' '}
                <Link to={`/projects/${match.params.projectId}/workflows`}>aqui</Link>.
              </span>
            }
          >
            {getFieldDecorator('workflow_id', {
              rules: [{ required: true, message: 'Por favor selecione um fluxo de trabalho!' }],
            })(
              <Select placeholder="Selecione um fluxo de trabalho" disabled={false}>
                {workflows.map(r => (
                  <Select.Option key={r.id}>{r.name}</Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" disabled={submitting} loading={submitting}>
              Criar Quadro
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default NewBoard;
