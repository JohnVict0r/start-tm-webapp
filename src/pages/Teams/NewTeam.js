import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import TeamForm from '@/components/Form/Team';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';

@connect((state, ownProps) => ({
  team: state.entities.teams[ownProps.match.params.id],
  saveteam: state.saveTeam,
  submitting: state.loading.effects['saveTeam/save'],
}))
@Form.create()
class NewTeam extends PureComponent {
  componentDidUpdate(prevProps) {
    const { form, saveteam } = this.props;

    if (prevProps.saveteam !== saveteam && saveteam.error) {
      const { errors } = saveteam.error;
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
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'saveTeam/save',
          payload: {
            values,
          },
        });
      }
    });
  };

  render() {
    const { form, match, team, submitting } = this.props;

    if (!team && match.params.id) {
      return <PageLoading />;
    }

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <TeamForm form={form} onSubmit={this.handleSubmit} submiting={submitting} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NewTeam;
