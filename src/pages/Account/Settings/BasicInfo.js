import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Upload, Button, Col, Row } from 'antd';
import { connect } from 'dva';
import { loggedInUserSelector } from '@/selectors/global';

import styles from './BasicInfo.less';

const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className={styles.avatar_title}>
      <FormattedMessage id="app.settings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload fileList={[]}>
      <div className={styles.button_view}>
        <Button icon="upload">
          <FormattedMessage id="app.settings.basic.change-avatar" defaultMessage="Change avatar" />
        </Button>
      </div>
    </Upload>
  </Fragment>
);

@connect(state => ({
  currentUser: loggedInUserSelector(state),
  submitting: state.loading.effects['user/updateUserInfo'],
}))
@Form.create()
class BasicInfo extends Component {
  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      form.setFieldsValue(obj);
    });
  };

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser.pictureUrl) {
      return currentUser.pictureUrl;
    }
    const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    return url;
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'user/updateUserInfo',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;

    return (
      <Row gutter={16} className={styles.baseView}>
        <Col xl={12} lg={24}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <Form.Item label={formatMessage({ id: 'app.settings.basic.email' })}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: false,
                    message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                  },
                ],
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'app.settings.basic.name' })}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.name-message' }, {}),
                  },
                ],
              })(
                <Input
                  maxLength={255}
                  placeholder={formatMessage({ id: 'app.settings.basic.name-placeholder' })}
                />
              )}
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage
                id="app.settings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form>
        </Col>
        <Col xl={12} lg={24}>
          <div className={styles.right}>
            <AvatarView avatar={this.getAvatarURL()} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default BasicInfo;
