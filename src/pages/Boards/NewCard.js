import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Spin } from 'antd';
import ColumnList from '@/components/ColumnList';
import styles from './SaveCardList.less';

@connect(state => ({
  validation: state.cards.validation,
  submitting: state.loading.effects['cards/save'],
}))
@Form.create()
class NewCard extends PureComponent {
  componentDidUpdate(prevProps) {
    const { form, validation } = this.props;

    if (prevProps.validation !== validation) {
      const { errors } = validation;
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
    form.validateFields({ force: true }, async (err, values) => {
      if (!err) {
        const { cardListId, onClose, dispatch } = this.props;
        dispatch({
          type: 'cards/save',
          payload: {
            cardListId,
            card: values,
          },
        }).then(data => {
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
      onClose,
    } = this.props;

    return (
      <ColumnList>
        <ColumnList.Header
          title="Nova Tarefa"
          actions={[
            <Button
              key="1"
              type="primary"
              size="small"
              onClick={this.handleSubmit}
              disabled={submitting}
            >
              Adicionar
            </Button>,
            <Button key="2" size="small" onClick={onClose} disabled={submitting}>
              Cancelar
            </Button>,
          ]}
        />
        <div className={styles.content}>
          <Spin spinning={!!submitting}>
            <Form className={styles.form} onSubmit={this.handleSubmit} hideRequiredMark>
              <Form.Item label="Nome">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Por favor informe o nome da tarefa!' }],
                })(<Input maxLength={255} placeholder="Insira o nome da tarefa" />)}
              </Form.Item>
              <Form.Item label="Descrição">
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: 'Por favor informe o descrição da tarefa!' }],
                })(
                  <Input.TextArea
                    maxLength={255}
                    autosize={{ minRows: 2, maxRows: 6 }}
                    placeholder="Insira a descricão da tarefa"
                  />
                )}
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </ColumnList>
    );
  }
}

export default NewCard;
