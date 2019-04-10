import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Button, Icon } from 'antd';
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
  state = {
    showForm: true
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchStatus',
    });
  }

  handleSubmit = async (e) => {
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
        }).then(() => {
          this.setState({ showForm: true });
          form.resetFields();
        });
      }
    });
  };

  handleCancel = () => {
    this.setState({ showForm: true });
  };

  saveFormRef = form => {
    this.form = form;
  };

  render() {
    const { status, submitting } = this.props;
    const { showForm } = this.state;

    return (
      <ColumnList>
        {showForm ? (
          <div className={styles.content}>
            <div
              className={styles.plusIcon}
              onClick={() => this.setState({ showForm: false })}
            >
              <Icon type='plus' />
              <div>Nova Lista</div>
            </div>
          </div>
        ) : [
          <ColumnList.Header
            title='Nova Lista'
          />,
          <div className={styles.content}>
            <Spin spinning={!!submitting}>
              <CardListForm
                className={styles.form}
                onSubmit={this.handleSubmit}
                status={status}
                initialValues={{}}
                wrappedComponentRef={this.saveFormRef}
              />
            </Spin>
          </div>,
          <ColumnList.Footer
            action={[
              <Button
                key='1'
                type='primary'
                block
                onClick={this.handleSubmit}
                disabled={submitting}
              >
                Adicionar
              </Button>,
              <Button
                key='2'
                block
                onClick={this.handleCancel}
                disabled={submitting}
              >
                Cancelar
              </Button>
            ]}
          />
        ]}
      </ColumnList>
    );
  }
}

export default withRouter(NewCardList);
