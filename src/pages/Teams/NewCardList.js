import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Spin } from 'antd';
import withRouter from 'umi/withRouter';
import ColumnList from '@/components/ColumnList';
import { statusSelector } from '@/selectors/global';
import CardListForm from './CardListForm';
import styles from './NewCardList.less'

@connect(state => ({
  status: statusSelector(state),
  submitting: state.loading.effects['boards/saveCardList'],
}))
class NewCardList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchStatus',
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.form.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch, match } = this.props;

        dispatch({
          type: 'boards/saveCardList',
          payload: {
            teamId: match.params.teamId,
            cardList: values,
          },
        });

        form.resetFields();
      }
    });
  };

  saveFormRef = form => {
    this.form = form;
  };

  render() {
    const { status, submitting } = this.props;
    return (
      <ColumnList
        className={styles.list}
      >
        <Spin spinning={!!submitting}>
          <CardListForm
            className={styles.form}
            onSubmit={this.handleSubmit}
            status={status}
            initialValues={{}}
            wrappedComponentRef={this.saveFormRef}
          />
        </Spin>
        <ColumnList.Footer
          action={(
            <Button
              block
              onClick={this.handleSubmit}
              disabled={submitting}
            >
              Adicionar
            </Button>
          )}
        />
      </ColumnList>
    );
  }
}

export default withRouter(NewCardList);
