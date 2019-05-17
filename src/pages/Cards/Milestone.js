import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Select, Form } from 'antd';
import styles from './Milestone.less';
import { milestonesSelector } from '../Teams/selectors/milestones';

@connect(state => ({
  milestones: milestonesSelector(state),
  submitting: state.loading.effects['cards/updateMilestone'],
  loading: state.loading.effects['milestones/fetch'],
}))
@Form.create()
class MilestoneForm extends PureComponent {
  static defaultProps = {
    current: {},
  };

  componentDidMount() {
    const { dispatch, teamId } = this.props;
    dispatch({
      type: 'milestones/fetch',
      payload: {
        teamId,
      },
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch, current, onClose } = this.props;
        if (values.milestone !== current.milestone) {
          dispatch({
            type: 'cards/updateMilestone',
            payload: {
              id: current.id,
              milestoneId: values.milestone,
            },
          }).then(data => {
            if (!data || !data.errors) {
              onClose();
              form.resetFields();
            }
          });
        } else {
          onClose();
          form.resetFields();
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
      loading,
      current: { milestone },
      milestones,
    } = this.props;

    const formItemLayout = {
      wrapperCol: {
        span: 24,
      },
    };

    return (
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator('milestone', {
            initialValue: !loading && milestone ? milestone.id : '',
          })(
            <Select loading={loading}>
              <Select.Option key={0} value="">
                {' '}
                Nenhum{' '}
              </Select.Option>
              {milestones.map(u => (
                <Select.Option key={u.id} value={u.id}>
                  {u.name}
                </Select.Option>
              ))}
            </Select>
          )}
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

export default MilestoneForm;
