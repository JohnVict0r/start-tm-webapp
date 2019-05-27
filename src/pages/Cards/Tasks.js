import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, TimePicker, List } from 'antd';
import moment from 'moment';
import { loggedInUserSelector } from '@/selectors/global';
import EditableSection from './EditableSection';

import styles from './Milestone.less';

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
      const duration = moment.duration(values.duration.format('HH:mm')).asMinutes();
      if (!err) {
        const { dispatch, card } = this.props;
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
      } else {
        form.resetFields();
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

    const format = 'HH:mm';

    return (
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator('description', {})(<Input maxLength={255} placeholder="Descrição" />)}
        </Form.Item>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator('duration', {})(
            <TimePicker
              format={format}
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

  render() {
    const {
      card: { tasks },
      currentUser,
    } = this.props;
    return (
      <EditableSection title="Atividades" editingComponent={this.renderEditing()}>
        {tasks && tasks.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={tasks}
            renderItem={item => (
              <List.Item
                actions={[
                  currentUser.id === item.creator.id && (
                    <a onClick={() => this.handleDelete(item.id)}>Remover</a>
                  ),
                ]}
              >
                <List.Item.Meta
                  // avatar={<Avatar src={item.creator.avatar} />}
                  title={item.creator.name}
                  description={item.description}
                />
                {`Duração: ${moment
                  .utc()
                  .startOf('day')
                  .add({ minutes: item.duration })
                  .format('H:mm')}`}
              </List.Item>
            )}
          />
        ) : (
          'Não há atividades'
        )}
      </EditableSection>
    );
  }
}

export default Tasks;
