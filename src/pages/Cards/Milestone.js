import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Select, Form } from 'antd';
import { milestonesSelector } from '../Clubs/selectors/milestones';
import EditableSection from './EditableSection';

import styles from './Milestone.less';

@connect(state => ({
  milestones: milestonesSelector(state),
  submitting: state.loading.effects['cards/updateMilestone'],
  loading: state.loading.effects['milestones/fetch'],
}))
@Form.create()
class MilestoneForm extends PureComponent {
  static defaultProps = {
    card: {},
  };

  componentDidMount() {
    const { dispatch, card } = this.props;
    dispatch({
      type: 'milestones/fetch',
      payload: {
        teamId: card.teamId,
      },
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch, card } = this.props;
        if (values.milestone !== card.milestone) {
          dispatch({
            type: 'cards/updateMilestone',
            payload: {
              id: card.id,
              milestoneId: values.milestone,
            },
          }).then(data => {
            if (!data || !data.errors) {
              form.resetFields();
            }
          });
        } else {
          form.resetFields();
        }
      }
    });
  };

  renderEditing = () => {
    const {
      form: { getFieldDecorator },
      submitting,
      loading,
      card: { milestone },
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
            <Select loading={loading} style={{ maxWidth: '250px' }}>
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
  };

  render() {
    const {
      card: { milestone },
    } = this.props;
    return (
      <EditableSection title="Entregável" editingComponent={this.renderEditing()}>
        {milestone ? milestone.name : 'Não há entregável'}
      </EditableSection>
    );
  }
}

export default MilestoneForm;
