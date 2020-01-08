import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Form, Select, Card, Button, DatePicker, InputNumber, Divider } from 'antd';
import { formatMessage } from 'umi/locale';
import { setFormWithError, formItemLayout, submitFormLayout } from '@/utils/forms';
import { cepMask, numberMask, upperCaseMask } from '@/utils/mask';
import EntryTableForm from './EntryTableForm';

const entryData = [
  {
    key: '1',
    type: 'R',
    price: 45.5,
  },
  {
    key: '2',
    type: 'K',
    price: 50.5,
  },
];

@connect((state, ownProps) => ({
  event: state.entities.events[ownProps.match.params.eventId],
  federation: state.entities.federations[ownProps.match.params.federationId],
  states: state.locations.states,
  citiesByUF: state.locations.citiesByUF,
  validation: state.validation['events/save'],
  submitting: state.loading.effects['events/save'],
}))
@Form.create()
class EventForm extends PureComponent {
  componentDidMount() {
    const { dispatch, federation, event } = this.props;
    dispatch({
      type: 'locations/fetchStates',
    });
    dispatch({
      type: 'locations/fetchcitiesByUF',
      payload: {
        uf: federation ? federation.uf : event.address.uf,
      },
    });
  }

  componentDidUpdate(prevProps) {
    const { form, validation } = this.props;
    if (prevProps.validation !== validation) {
      setFormWithError(form, validation);
    }
  }

  handleChangeCep = e => {
    return cepMask(e.target.value);
  };

  handleChangeNumber = e => {
    return numberMask(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch, match, event, federation } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { name, typeEvent, duration, entries, tables, ...address } = values;

        // TODO verificar se o formato DD/MM/YYYY é suficiente
        const [startline, deadline] = duration;

        // Entries
        const entriesData = entries.map(entry => {
          const { type, price } = entry;
          const typeFormated = upperCaseMask(type);
          return { type: typeFormated, price };
        });

        // Tables
        const tablesData = [];
        for (let i = 1; i <= parseInt(tables, 10); i += 1) {
          tablesData.push({ order: i });
        }

        if (match.params.eventId) {
          dispatch({
            type: 'events/save',
            payload: {
              event: {
                name,
                type: typeEvent,
                // duration
                start: startline,
                end: deadline,
                // é necessário criar o Objeto address
                address: {
                  ...address,
                },
                entries: entriesData,
              },
              id: match.params.eventId,
            },
          });
          dispatch({
            type: 'address/save',
            payload: {
              address: {
                ...address,
              },
              id: event.addressId,
            },
          });
        } else {
          dispatch({
            type: 'events/save',
            payload: {
              event: {
                // TODO owner_id mudar para federation_id
                owner_id: match.params.federationId,
                name,
                type: typeEvent,
                // duration
                start: startline,
                end: deadline,
                // é necessário criar o Objeto address
                address: {
                  ...address,
                  uf: federation.uf,
                },
                entries: entriesData,
                championships: [],
                tables: tablesData,
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
      federation,
      event,
      citiesByUF,
    } = this.props;

    return (
      <Card
        title={
          event
            ? formatMessage({ id: 'app.event.edit' })
            : formatMessage({ id: 'app.event.create' })
        }
        bordered={false}
      >
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Form.Item label="Nome do Evento" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Por favor informe o nome do evente!' }],
              initialValue: event && event.name,
            })(<Input maxLength={255} placeholder="Insira o nome do evento" />)}
          </Form.Item>
          <Form.Item label="Tipo do evento" {...formItemLayout}>
            {getFieldDecorator('typeEvent', {
              rules: [{ required: true, message: 'Por favor informe o tipo do evento!' }],
              initialValue: event && event.name,
            })(
              <Select placeholder={formatMessage({ id: 'app.event.form.type.placeholder' })}>
                <Select.Option key="state">Estadual</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Período do evento" {...formItemLayout}>
            {getFieldDecorator('duration', {
              rules: [{ required: true, message: 'Por favor informe o periodo do evento!' }],
            })(<DatePicker.RangePicker format="DD/MM/YYYY" />)}
          </Form.Item>
          <Form.Item label="Quantidade de mesas" {...formItemLayout}>
            {getFieldDecorator('tables', {
              rules: [{ required: true, message: 'Por favor informe o periodo do evento!' }],
            })(<InputNumber defaultValue={4} min={0} max={50} />)}
          </Form.Item>
          <Divider>Endereço</Divider>
          <Form.Item label="Logradouro" {...formItemLayout}>
            {getFieldDecorator('street', {
              rules: [{ required: true, message: 'Por favor informe o logradouro!' }],
              initialValue: event && event.address.street,
            })(<Input maxLength={255} placeholder="Insira o logradouro" />)}
          </Form.Item>
          <Form.Item label="numero" {...formItemLayout}>
            {getFieldDecorator('number', {
              rules: [{ required: true, message: 'Por favor informe o número!' }],
              initialValue: event && event.address.number,
              getValueFromEvent: this.handleChangeNumber,
            })(<Input maxLength={11} placeholder="Insira o número" />)}
          </Form.Item>
          <Form.Item label="CEP" {...formItemLayout}>
            {getFieldDecorator('cep', {
              rules: [{ required: true, message: 'Por favor informe o CEP!' }],
              initialValue: event && event.address.cep,
              getValueFromEvent: this.handleChangeCep,
            })(<Input maxLength={255} placeholder="Insira o CEP" />)}
          </Form.Item>
          <Form.Item label="Bairro" {...formItemLayout}>
            {getFieldDecorator('neighborhood', {
              rules: [{ message: 'Por favor informe o bairro!' }],
              initialValue: event && event.address.neighborhood,
            })(<Input maxLength={255} placeholder="Insira o bairro" />)}
          </Form.Item>
          <Form.Item label="Complemento" {...formItemLayout}>
            {getFieldDecorator('complement', {
              rules: [{ message: 'Por favor informe o complemento!' }],
              initialValue: event && event.address.complement,
            })(<Input maxLength={255} placeholder="Insira o complemento" />)}
          </Form.Item>
          <Form.Item label="Cidade" {...formItemLayout}>
            {getFieldDecorator('city', {
              rules: [{ required: true, message: 'Por favor informe o nome da cidade!' }],
              initialValue: event && event.address.city,
            })(
              <Select placeholder={formatMessage({ id: 'form.city.placeholder' })}>
                {/* TODO fazer com que salve o id do estado */}
                {citiesByUF &&
                  citiesByUF[federation ? federation.uf : event.federation.uf] &&
                  citiesByUF[federation ? federation.uf : event.federation.uf].map(i => (
                    <Select.Option key={i.nome}>{i.nome}</Select.Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Divider>Configurações</Divider>
          <Form.Item label="Valores de Inscrição" {...formItemLayout}>
            {getFieldDecorator('entries', {
              initialValue: entryData,
            })(<EntryTableForm />)}
          </Form.Item>
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {event
                ? formatMessage({ id: 'app.event.edit' })
                : formatMessage({ id: 'app.event.create' })}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default EventForm;
