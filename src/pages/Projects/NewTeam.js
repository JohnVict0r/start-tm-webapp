import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Form, Input } from 'antd';
import { setFormWithError } from '@/utils/forms';

@connect(state => ({
  validation: state.validation['newTeam/create'],
  submitting: state.loading.effects['newTeam/create'],
}))
@Form.create()
class NewTeam extends PureComponent {
  componentDidUpdate(prevProps) {
    const { form, validation } = this.props;
    if (prevProps.validation !== validation) {
      setFormWithError(form, validation);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, match, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'newTeam/create',
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
