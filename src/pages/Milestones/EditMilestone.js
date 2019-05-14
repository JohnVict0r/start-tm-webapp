import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Form, Card, Button, DatePicker } from 'antd';
import moment from 'moment';

@connect((state, ownProps) => ({
  milestone: state.entities.milestones[ownProps.match.params.milestoneId],
  milestones: state.milestones,
  submitting: state.loading.effects['milestones/save'],
}))
@Form.create()
class EditMilestone extends PureComponent {
  componentDidUpdate(prevProps) {
    const { form, milestones } = this.props;

    if (prevProps.milestones !== milestones && milestones.error) {
      const { errors } = milestones.error;
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
    const { form, milestone } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        const [startline, deadline] = values.duration;
        dispatch({
          type: 'milestones/save',
          payload: {
            id: milestone.id,
            milestone: {
              ...values,
              startline,
              deadline,
            },
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      milestone,
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
      <Card title="Editar entregável" bordered={false}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Form.Item label="Nome do entregável:" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Por favor informe o nome!' }],
              initialValue: milestone.name,
            })(<Input maxLength={255} placeholder="Nome do entregável" />)}
          </Form.Item>
          <Form.Item label="Descrição:" {...formItemLayout}>
            {getFieldDecorator('description', {
              rules: [{ required: true, message: 'Por favor informe o descrição!' }],
              initialValue: milestone.description,
            })(<Input.TextArea maxLength={255} placeholder="Descricão do entregável" />)}
          </Form.Item>
          <Form.Item label="Duração:" {...formItemLayout}>
            {getFieldDecorator('duration', {
              rules: [{ required: true, message: 'Por favor informe os prazos!' }],
              initialValue: [moment(milestone.startline), moment(milestone.deadline)],
            })(<DatePicker.RangePicker format="DD/MM/YYYY" />)}
          </Form.Item>
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Editar entregável
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default EditMilestone;
