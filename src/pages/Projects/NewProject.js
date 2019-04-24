import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Form, Card, Button } from 'antd';
import { formatMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(state => ({
  proejcts: state.saveProject,
  submitting: state.loading.effects['saveProject/save'],
}))
@Form.create()
class NewProject extends PureComponent {
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
      <PageHeaderWrapper title="Novo projeto">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
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
