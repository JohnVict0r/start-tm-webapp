import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import Link from 'umi/link';
import { Input, Form, Card, Select, Button } from 'antd';
import { formatMessage } from 'umi/locale';
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import PageLoading from '@/components/PageLoading';
import { setFormWithError } from '@/utils/forms';

@connect((state, ownProps) => ({
  federation: state.entities.federations[ownProps.match.params.federationId],
  validation: state.validation['federations/save'],
  submitting: state.loading.effects['federations/save'],
  states: state.locations.states,
  loading: state.loading.effects['locations/fetchStates'],
}))
@Form.create()
class FederationForm extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'locations/fetchStates',
    });
  }

  componentDidUpdate(prevProps) {
    const { form, validation } = this.props;
    if (prevProps.validation !== validation) {
      setFormWithError(form, validation);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch, match } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        if (match.params.federationId) {
          dispatch({
            type: 'federations/save',
            payload: {
              federation: values,
              id: match.params.federationId,
            },
          });
        } else {
          dispatch({
            type: 'federations/save',
            payload: {
              federation: values,
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
      states,
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
          federation
            ? formatMessage({ id: 'app.federation.edit' })
            : formatMessage({ id: 'app.federation.create' })
        }
        bordered={false}
      >
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Form.Item label={formatMessage({ id: 'app.federation.form.name' })} {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'app.federation.form.name.message' }),
                },
              ],
              initialValue: federation && federation.name,
            })(
              <Input
                maxLength={255}
                placeholder={formatMessage({ id: 'app.federation.form.name.placeholder' })}
              />
            )}
          </Form.Item>

          <Form.Item
            label={formatMessage({ id: 'app.federation.form.initials' })}
            {...formItemLayout}
          >
            {getFieldDecorator('initials', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'app.federation.form.initials.message' }),
                },
              ],
              initialValue: federation && federation.initials,
            })(
              <Input
                maxLength={255}
                placeholder={formatMessage({ id: 'app.federation.form.initials.placeholder' })}
              />
            )}
          </Form.Item>

          <Form.Item
            label={formatMessage({ id: 'app.federation.form.uf' })}
            {...formItemLayout}
            // help={
            //   <span>
            //     <Link to="/">Leia mais</Link> sobre as federações.
            //   </span>
            // }
          >
            {getFieldDecorator('uf', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'app.federation.form.uf.message' }),
                },
              ],
              initialValue: federation && federation.uf,
            })(
              <Select placeholder={formatMessage({ id: 'app.federation.form.uf.placeholder' })}>
                {/* TODO fazer com que salve o id do estado */}
                {states &&
                  states.map(i => (
                    <Select.Option key={i.sigla}>{`${i.nome} - ${i.sigla}`}</Select.Option>
                  ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {federation
                ? formatMessage({ id: 'app.federation.edit' })
                : formatMessage({ id: 'app.federation.create' })}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default FederationForm;
