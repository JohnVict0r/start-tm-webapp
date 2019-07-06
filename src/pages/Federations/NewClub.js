import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import Link from 'umi/link';
import { Input, Form, Card, Button, Select } from 'antd';
import { formatMessage } from 'umi/locale';
import { setFormWithError } from '@/utils/forms';

@connect(state => ({
  validation: state.validation['clubs/save'],
  submitting: state.loading.effects['clubs/save'],
}))
@Form.create()
class NewEvent extends PureComponent {
  componentDidUpdate(prevProps) {
    const { form, validation } = this.props;
    if (prevProps.validation !== validation) {
      setFormWithError(form, validation);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch, ownProps } = this.props;
    console.log('chegou no handleSubmit')
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        console.log('não teve erro no form')
        dispatch({
          type: 'clubs/createFederationClub',
          payload: {            
            name: values.name,
            federation_id: ownProps.match.params.federationId,
            address: {
              street: values.street,
              number: values.number,
              neighborhood: values.neighborhood,
              cep: values.cep,
              complement: values.complement,
              city: values.city,
              uf: values.city
            }
          },
        });
      }
    });
  };

  render() {
    const {
      club,
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
      <Card
        title={
          club ? formatMessage({ id: 'app.club.edit' }) : formatMessage({ id: 'app.club.create' })
        }
        bordered={false}
      >
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Form.Item label="Nome do Clube" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Por favor informe o nome do clube!' }],
            })(<Input maxLength={255} placeholder="Insita o nome do Clube" />)}
          </Form.Item>
          <Form.Item label="Logradouro" {...formItemLayout}>
            {getFieldDecorator('street', {
              rules: [{ required: true, message: 'Por favor informe o logradouro!' }],
            })(<Input maxLength={255} placeholder="Insita o logradouro" />)}
          </Form.Item>
          <Form.Item label="numero" {...formItemLayout}>
            {getFieldDecorator('number', {
              rules: [{ required: true, message: 'Por favor informe o logradouro!' }],
            })(<Input maxLength={255} placeholder="Insita o logradouro" />)}
          </Form.Item>
          <Form.Item label="Bairro" {...formItemLayout}>
            {getFieldDecorator('neighborhood', {
              rules: [{ required: true, message: 'Por favor informe o logradouro!' }],
            })(<Input maxLength={255} placeholder="Insita o logradouro" />)}
          </Form.Item>
          <Form.Item label="CEP" {...formItemLayout}>
            {getFieldDecorator('cep', {
              rules: [{ required: true, message: 'Por favor informe o logradouro!' }],
            })(<Input maxLength={255} placeholder="Insita o logradouro" />)}
          </Form.Item>
          <Form.Item label="Complemento" {...formItemLayout}>
            {getFieldDecorator('complement', {
              rules: [{ required: true, message: 'Por favor informe o logradouro!' }],
            })(<Input maxLength={255} placeholder="Insita o logradouro" />)}
          </Form.Item>
          <Form.Item label="Cidade" {...formItemLayout}>
            {getFieldDecorator('city', {
              rules: [{ required: true, message: 'Por favor informe o logradouro!' }],
            })(<Input maxLength={255} placeholder="Insita o logradouro" />)}
          </Form.Item>
          <Form.Item
            label={formatMessage({ id: 'app.federation.form.uf' })}
            {...formItemLayout}
          >
            {getFieldDecorator('uf', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'app.federation.form.uf.message' }),
                },
              ],
            })(
              <Select placeholder={formatMessage({ id: 'app.federation.form.uf.placeholder' })}>
                {/* a key deve ser uma da constantes definidas na migration do backend */}
                <Select.Option key="RN">RN</Select.Option>
                <Select.Option key="PB">PB</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {formatMessage({ id: 'app.club.create' })}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default NewEvent;
