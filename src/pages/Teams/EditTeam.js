import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import TeamForm from '@/components/Form/Team';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';

@connect((state, ownProps) => ({
  team: state.entities.teams[ownProps.match.params.id],
  saveteam: state.saveTeam,
  loading: state.loading.effects['teams/fetchTeam'],
  submitting: state.loading.effects['saveTeam/save'],
}))
@Form.create()
class EditTeam extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'teams/fetchTeam',
      payload: match.params.id,
    });
  }

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
    const { form, dispatch, match } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'saveTeam/save',
          payload: {
            id: match.params.id,
            values,
          },
        });
      }
    });
  };

  render() {
    const { form, team, submitting, loading } = this.props;

    if (loading) {
      return <PageLoading />;
    }

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <TeamForm
            form={form}
            onSubmit={this.handleSubmit}
            current={team}
            submiting={submitting}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default EditTeam;
