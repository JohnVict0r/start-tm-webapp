import React, { PureComponent } from 'react';
// import { connect } from 'dva';
// import Link from 'umi/link';
import { Input, Form, Card, Button } from 'antd';
import { formatMessage } from 'umi/locale';

// @connect(state => ({
//   proejcts: state.saveProject,
//   submitting: state.loading.effects['saveProject/save'],
// }))
@Form.create()
class NewEvent extends PureComponent {
  // componentDidUpdate(prevProps) {
  //   const { form, proejcts } = this.props;

  //   if (prevProps.proejcts !== proejcts && proejcts.error) {
  //     const { errors } = proejcts.error;
  //     const mapErrors = Object.keys(errors).reduce(
  //       (accum, key) => ({
  //         ...accum,
  //         [key]: {
  //           value: form.getFieldValue(key),
  //           errors: errors[key].map(err => new Error(err)),
  //         },
  //       }),
  //       {}
  //     );

  //     form.setFields(mapErrors);
  //   }
  // }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'clubs/save',
          payload: values,
        });
        form.resetFields();
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
