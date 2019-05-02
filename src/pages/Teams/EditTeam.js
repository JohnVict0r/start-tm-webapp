import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Form, Card, Button } from 'antd';
import { formatMessage } from 'umi/locale';
import { makeTeamSelector } from './selectors/teams';

@connect((state, ownProps) => {
  const teamSelector = makeTeamSelector({ id: ownProps.match.params.teamId });
  return {
    team: teamSelector(state),
    teams: state.Teams,
    submitting: state.loading.effects['Teams/update'],
}})
@Form.create()
class EditTeam extends PureComponent {
  componentDidUpdate(prevProps) {
    const { form, teams } = this.props;

    if (prevProps.teams !== teams && teams.error) {
      const { errors } = teams.error;
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
    const { form, match, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'teams/update',
          payload: {
            id: match.params.teamId,
            ...values,
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      team,
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
      <Card title={formatMessage({ id: 'app.team.edit' })} bordered={false}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Form.Item label={formatMessage({ id: 'app.team.name' })} {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: formatMessage({ id: 'app.team.name.message' }) }],
              initialValue: team && team.name,
            })(<Input maxLength={255} placeholder={formatMessage({ id: 'app.team.name.placeholder' })} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label={formatMessage({ id: 'app.team.description' })}>
            {getFieldDecorator('description', {
              rules: [
                {
                  message: formatMessage({ id: 'app.team.description.message' }),
                  min: 5,
                },
              ],
              initialValue: team && team.description,
            })(
              <Input.TextArea
                maxLength={255}
                rows={4}
                placeholder={formatMessage({ id: 'app.team.description.message' })}
              />
            )}
          </Form.Item>
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {formatMessage({ id: 'app.team.edit' })}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default EditTeam;
