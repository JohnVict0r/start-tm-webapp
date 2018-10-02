import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form, Input } from 'antd';
import Result from '@/components/Result';
import styles from './index.less';

class NewTeamModal extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    done: PropTypes.bool,
    onSubmit: PropTypes.func,
    onDone: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    done: false,
    onSubmit: () => {},
    onDone: () => {},
    onCancel: () => {},
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      onSubmit(err, values);
    });
  };

  render() {
    const {
      visible,
      done,
      onCancel,
      onDone,
      form: { getFieldDecorator },
    } = this.props;

    const modalFooter = done
      ? { footer: null, onCancel: onDone }
      : { okText: 'Criar', onOk: this.handleSubmit, onCancel };

    const formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="Equipe criada com sucesso!"
            description="Sua equipe foi criada e já pode ser acessada."
            actions={
              <Button type="primary" onClick={onDone}>
                Entendi!
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Nome da equipe" {...formLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Por favor informe o nome da equipe!' }],
            })(<Input placeholder="Insita o nome da equipe" />)}
          </Form.Item>
          <Form.Item {...formLayout} label="Descrição">
            {getFieldDecorator('description', {
              rules: [
                { message: 'Por favor, insira uma descrição com pelo menos 5 caracteres', min: 5 },
              ],
            })(<Input.TextArea rows={4} placeholder="Por favor, insira uma descrição da equipe" />)}
          </Form.Item>
        </Form>
      );
    };
    return (
      <Modal
        title={done ? null : `Criar equipe`}
        className={styles.standardListForm}
        width={640}
        bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
        destroyOnClose
        visible={visible}
        {...modalFooter}
      >
        {getModalContent()}
      </Modal>
    );
  }
}

export default Form.create()(NewTeamModal);
