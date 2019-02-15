import { Modal, Form, Input, Checkbox, Select } from 'antd';
import { formatMessage } from 'umi/locale';
import React from 'react';

const WorkflowNodeForm = Form.create({ name: 'form_workflow_node_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    state = {
      checkCanCreateCard: false,
    };

    handleChange = () => {
      const { checkCanCreateCard } = this.state;
      this.setState({
        checkCanCreateCard: !checkCanCreateCard,
      });
    };

    handleSubmit = e => {
      e.preventDefault();
      const { form, onCreate } = this.props;
      form.validateFields({ force: true }, (err, values) => {
        if (err) {
          return;
        }
        onCreate(err, values);
        form.resetFields();
        this.setState({
          checkCanCreateCard: false,
        });
      });
    };

    render() {
      const { visible, onCancel, form, status, initialValues } = this.props;

      const { getFieldDecorator } = form;

      const { Option } = Select;

      let { checkCanCreateCard } = this.state;

      if (initialValues.canCreateCard === 1) {
        checkCanCreateCard = true;
      }

      const TitleModal = initialValues.id ? 'Alterar Etapa' : 'Adicionar Etapa';
      const OkTextModal = initialValues.id ? 'Alterar' : 'Adicionar';

      return (
        <Modal
          visible={visible}
          title={TitleModal}
          okText={OkTextModal}
          onCancel={onCancel}
          onOk={this.handleSubmit}
        >
          <Form layout="vertical">
            <Form.Item label="Nome">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.workflow.form.node.name-message' }),
                  },
                ],
                initialValue: initialValues.name,
              })(
                <Input
                  maxLength={50}
                  placeholder={formatMessage({ id: 'app.workflow.form.node.name' })}
                />
              )}
            </Form.Item>
            <Form.Item label="Status">
              {getFieldDecorator('status_id', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.workflow.form.node.status-message' }),
                  },
                ],
                initialValue: initialValues.status && initialValues.status.id,
              })(
                <Select
                  placeholder={formatMessage({ id: 'app.workflow.form.node.status' })}
                  onChange={this.handleSelectChange}
                >
                  {status.map(s => (
                    <Option value={s.id} key={s.id}>
                      {s.displayName}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('can_create_card')(
                <Checkbox checked={checkCanCreateCard} onChange={this.handleChange}>
                  {formatMessage({ id: 'app.workflow.form.node.check' })}
                </Checkbox>
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);
export default WorkflowNodeForm;
