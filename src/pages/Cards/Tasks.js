import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Collapse, Form, Input, TimePicker, Typography, List } from 'antd';
import moment from 'moment';
import { loggedInUserSelector } from '@/selectors/global';
import EditableSection from './EditableSection';

import styles from './Tasks.less';

const formatDuration = duration => {
  return `${Math.floor(duration / 60)}h${duration % 60}m`;
};

@connect(state => ({
  submitting: state.loading.effects['cards/updateMilestone'],
  currentUser: loggedInUserSelector(state),
}))
@Form.create()
class Tasks extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch, card } = this.props;
        const duration = moment.duration(values.duration.format('HH:mm')).asMinutes();
        dispatch({
          type: 'cards/saveTask',
          payload: {
            cardId: card.id,
            task: {
              description: values.description,
              duration,
            },
          },
        }).then(data => {
          if (!data || !data.errors) {
            form.resetFields();
          }
        });
      }
    });
  };

  handleDelete = taskId => {
    const { dispatch, card } = this.props;
    dispatch({
      type: 'cards/removeTask',
      payload: {
        cardId: card.id,
        taskId,
      },
    });
  };

  renderEditing = () => {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;

    const formItemLayout = {
      wrapperCol: {
        span: 24,
      },
    };

    return (
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        <Typography.Paragraph type="secondary">
          Registre uma atividade informando o tempo gasto para executá-la
        </Typography.Paragraph>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Informe uma descrição!' }],
          })(<Input maxLength={255} placeholder="Descrição" />)}
        </Form.Item>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator('duration', {
            rules: [{ required: true, message: 'Informe a duração da atividade!' }],
          })(
            <TimePicker
              format="HH:mm"
              placeholder="Duração"
              minuteStep={5}
              style={{ width: '100%' }}
            />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout}>
          <Button block type="primary" htmlType="submit" loading={submitting}>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    );
  };

  renderTaskItem = item => {
    const { currentUser } = this.props;
    return (
      <List.Item>
        <div>
          <Typography.Paragraph strong>{item.description}</Typography.Paragraph>
          <Typography.Text type="secondary">
            {'Duração de '}
            <b>{formatDuration(item.duration)}</b>
          </Typography.Text>
          <div>
            <Typography.Text type="secondary">
              Por <b>{item.creator.name}</b>
            </Typography.Text>
          </div>
          {currentUser.id === item.creator.id && (
            <div style={{ textAlign: 'right' }}>
              <a onClick={() => this.handleDelete(item.id)}>Remover</a>
            </div>
          )}
        </div>
      </List.Item>
    );
  };

  render() {
    const { card } = this.props;
    const { tasks, tasksTotalDuration } = card;

    const totalDuration = (
      <span>
        Duração total: <b>{formatDuration(tasksTotalDuration)}</b>
      </span>
    );

    return (
      <EditableSection
        title="Atividades"
        actionText="Adicionar"
        editingComponent={this.renderEditing()}
      >
        {tasks && tasks.length > 0 ? (
          <Collapse className={styles.collapse} bordered={false} expandIconPosition="right">
            <Collapse.Panel header={totalDuration} key="1">
              <List itemLayout="horizontal" dataSource={tasks} renderItem={this.renderTaskItem} />
            </Collapse.Panel>
          </Collapse>
        ) : (
          'Não há atividades'
        )}
      </EditableSection>
    );
  }
}

export default Tasks;
