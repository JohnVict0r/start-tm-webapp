import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import Link from 'umi/link';
import { Input, Form, Card, Button, Divider } from 'antd';
import { formatMessage } from 'umi/locale';
import { setFormWithError } from '@/utils/forms';

@connect((state, ownProps) => ({
  club: state.entities.clubs[ownProps.match.params.clubId],
  federation: state.entities.federations[ownProps.match.params.federationId],
  validation: state.validation['clubs/save'],
  submitting: state.loading.effects['clubs/save'],
}))
@Form.create()
class ClubForm extends PureComponent {
  componentDidUpdate(prevProps) {
    const { form, validation } = this.props;
    if (prevProps.validation !== validation) {
      setFormWithError(form, validation);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch, match, club, federation } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { name, ...address } = values;
        if (match.params.clubId) {
          dispatch({
            type: 'clubs/save',
            payload: {
              club: {
                name,
                // é necessário criar o Objeto address
                address: {
                  ...address,
                },
              },
              id: match.params.clubId,
            },
          });
          dispatch({
            type: 'address/save',
            payload: {
              address: {
                ...address,
              },
              id: club.addressId,
            },
          });
        } else {
          dispatch({
            type: 'clubs/save',
            payload: {
              club: {
                name,
                federation_id: match.params.federationId,
                // é necessário criar o Objeto address
                address: {
                  ...address,
                  uf: federation.uf,
                },
              },
            },
          });
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
      club,
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
              initialValue: club && club.name,
            })(<Input maxLength={255} placeholder="Insita o nome do Clube" />)}
          </Form.Item>
          <Divider>Endereço</Divider>
          <Form.Item label="Logradouro" {...formItemLayout}>
            {getFieldDecorator('street', {
              rules: [{ required: true, message: 'Por favor informe o logradouro!' }],
              initialValue: club && club.address.street,
            })(<Input maxLength={255} placeholder="Insita o logradouro" />)}
          </Form.Item>
          <Form.Item label="numero" {...formItemLayout}>
            {getFieldDecorator('number', {
              rules: [{ required: true, message: 'Por favor informe o número!' }],
              initialValue: club && club.address.number,
            })(<Input maxLength={255} placeholder="Insita o número" />)}
          </Form.Item>
          <Form.Item label="Bairro" {...formItemLayout}>
            {getFieldDecorator('neighborhood', {
              rules: [{ required: true, message: 'Por favor informe o bairro!' }],
              initialValue: club && club.address.neighborhood,
            })(<Input maxLength={255} placeholder="Insita o bairro" />)}
          </Form.Item>
          <Form.Item label="CEP" {...formItemLayout}>
            {getFieldDecorator('cep', {
              rules: [{ required: true, message: 'Por favor informe o CEP!' }],
              initialValue: club && club.address.cep,
            })(<Input maxLength={255} placeholder="Insita o ;CEP" />)}
          </Form.Item>
          <Form.Item label="Complemento" {...formItemLayout}>
            {getFieldDecorator('complement', {
              rules: [{ required: true, message: 'Por favor informe o complemento!' }],
              initialValue: club && club.address.complement,
            })(<Input maxLength={255} placeholder="Insira o complemento" />)}
          </Form.Item>
          <Form.Item label="Cidade" {...formItemLayout}>
            {getFieldDecorator('city', {
              rules: [{ required: true, message: 'Por favor informe o nome da cidade!' }],
              initialValue: club && club.address.city,
            })(<Input maxLength={255} placeholder="Insira o nome da cidade" />)}
          </Form.Item>
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {club
                ? formatMessage({ id: 'app.club.edit' })
                : formatMessage({ id: 'app.club.create' })}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default ClubForm;
