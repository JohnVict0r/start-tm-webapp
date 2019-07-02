import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import Link from 'umi/link';
import { Input, Form, Card, Select, Button } from 'antd';
import { formatMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { setFormWithError } from '@/utils/forms';

@connect(state => ({
  validation: state.validation['federations/save'],
  proejcts: state.saveProject,
  // submitting: state.loading.effects['saveProject/save'],
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
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'federations/save',
          payload: {
            federation: values,
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
      <PageHeaderWrapper title={formatMessage({ id: 'app.federation.create' })}>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <Form.Item
              label={formatMessage({ id: 'app.federation.form.name' })}
              {...formItemLayout}
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.federation.form.name.message' }),
                  },
                ],
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
                {formatMessage({ id: 'app.federation.create' })}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NewEvent;
