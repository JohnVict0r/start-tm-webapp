import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Button, Form, Input, Select, Checkbox, Badge } from 'antd';
import withRouter from 'umi/withRouter';
import ColumnList from '@/components/ColumnList';
import { statusSelector } from '@/selectors/global';
import styles from './SaveCardList.less';

@connect(state => ({
  status: statusSelector(state),
  submitting: state.loading.effects['boards/saveCardList'],
}))
@Form.create()
class SaveCardList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchStatus',
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { form, current, onClose } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch, match } = this.props;

        const payload =
          current && current.id
            ? {
                id: current.id,
                cardList: values,
              }
            : {
                teamId: match.params.teamId,
                cardList: values,
              };

        dispatch({
          type: 'boards/saveCardList',
          payload,
        }).then(() => {
          onClose();
          form.resetFields();
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      current = {},
      status,
      submitting,
      onClose,
    } = this.props;

    return (
      <ColumnList>
        <ColumnList.Header
          title={current.id ? 'Alterar Lista' : 'Nova Lista'}
          actions={[
            <Button
              key="1"
              type="primary"
              size="small"
              onClick={this.handleSubmit}
              disabled={submitting}
            >
              {current.id ? 'Salvar' : 'Adicionar'}
            </Button>,
            <Button key="2" size="small" onClick={onClose} disabled={submitting}>
              Cancelar
            </Button>,
          ]}
        />
        <div className={styles.content}>
          <Spin spinning={!!submitting}>
            <Form layout="vertical" className={styles.form} onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Por favor insira um nome!' }],
                  initialValue: current.name,
                })(<Input autoFocus maxLength={50} placeholder="Nome" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('status_id', {
                  rules: [{ required: true, message: 'Por favor escolha um status!' }],
                  initialValue: current.status && current.status.id,
                })(
                  <Select placeholder="Status Associado">
                    {status.map(s => (
                      <Select.Option value={s.id} key={s.id}>
                        <Badge color={s.color} /> {s.displayName}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('can_create_card', {
                  initialValue: current.canCreateCard,
                  valuePropName: 'checked',
                })(<Checkbox>Pode criar tarefa</Checkbox>)}
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </ColumnList>
    );
  }
}

export default withRouter(SaveCardList);
