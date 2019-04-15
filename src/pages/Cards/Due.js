import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, DatePicker, Form } from 'antd';
import moment from 'moment';

import styles from './Due.less';

@connect(state => ({
  submitting: state.loading.effects['cards/save'],
}))
@Form.create()
class DueForm extends PureComponent {
  static defaultProps = {
    current: {},
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const {dispatch, current, onClose} = this.props;

        dispatch({
          type: 'cards/save',
          payload: {
            id: current.id,
            card: {...values},
          },
        }).then((data) => {
          if (!data || !data.errors) {
            onClose();
            form.resetFields();
          }
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
      current,
    } = this.props;

    const formItemLayout = {
      wrapperCol: {
        span: 24,
      },
    };

    return (
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator('due', {
            rules: [{ required: true, message: 'Por favor informe o prazo do card!' }],
            initialValue: current.due ? moment(current.due) : null,
          })(<DatePicker showTime format="DD/MM/YYYY HH:mm:ss" />)}
        </Form.Item>
        <Form.Item {...formItemLayout}>
          <Button block type="primary" htmlType="submit" loading={submitting}>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default DueForm;
