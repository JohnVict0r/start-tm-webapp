import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import Link from 'umi/link';
import { Input, InputNumber, DatePicker, Form, Select, Card, Button, Divider } from 'antd';
// import { formatMessage } from 'umi/locale';
import { setFormWithError, formItemLayout, submitFormLayout } from '@/utils/forms';
import { cpfMask } from '@/utils/mask';

@connect((state, ownProps) => ({
  club: state.entities.clubs[ownProps.match.params.clubId],
  // states: state.locations.states,
  // citiesByUF: state.locations.citiesByUF,
  validation: state.validation['athletes/save'],
  submitting: state.loading.effects['athletes/save'],
}))
@Form.create()
class AthleteForm extends PureComponent {
  componentDidUpdate(prevProps) {
    const { form, validation } = this.props;
    if (prevProps.validation !== validation) {
      setFormWithError(form, validation);
    }
  }

  handleChangeCpf = e => {
    return cpfMask(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();

    const { form, dispatch, match } = this.props;

    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { rating, ...person } = values;

        if (match.params.athleteId) {
          dispatch({
            type: 'clubs/save',
            payload: {
              athlete: {
                club_id: match.params.clubId,
                rating,
                // person,
              },
              id: match.params.athleteId,
            },
          });
        } else {
          dispatch({
            type: 'athletes/save',
            payload: {
              athlete: {
                club_id: match.params.clubId,
                rating,
                people: {
                  ...person,
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
    } = this.props;

    return (
      <Card title="Criar Atleta" bordered={false}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Form.Item label="Pontuação do atleta" {...formItemLayout}>
            {getFieldDecorator('rating', {
              rules: [{ required: true, message: 'Por favor informe a pontuação do atleta!' }],
              // initialValue: club && club.name,
            })(<InputNumber placeholder="Insira o nome do Clube" />)}
          </Form.Item>
          <Divider>Dados pessoais</Divider>
          <Form.Item label="Nome do Atleta" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Por favor informe o nome do clube!' }],
              // initialValue: club && club.name,
            })(<Input maxLength={255} placeholder="Insira o nome do Clube" />)}
          </Form.Item>
          <Form.Item label="Sexo" {...formItemLayout}>
            {getFieldDecorator('sex', {
              rules: [{ required: true, message: 'Por favor informe o nome da cidade!' }],
              // initialValue: athlete && athlete.sex,
            })(
              <Select placeholder="Selecione o sexo">
                <Select.Option key="MALE">Masculino</Select.Option>
                <Select.Option key="FEMALE">Feminino</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Data de nascimento" {...formItemLayout}>
            {getFieldDecorator('birth', {
              rules: [{ required: true, message: 'Por favor informe a data de nascimento!' }],
            })(<DatePicker format="DD/MM/YYYY" />)}
          </Form.Item>
          <Form.Item label="CPF" {...formItemLayout}>
            {getFieldDecorator('cpf', {
              rules: [{ required: true, message: 'Por favor informe o CPF!' }],
              // initialValue: event && event.address.number,
              getValueFromEvent: this.handleChangeCpf,
            })(<Input maxLength={14} placeholder="Insira o cpf" />)}
          </Form.Item>
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Cadastrar Atleta
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default AthleteForm;
