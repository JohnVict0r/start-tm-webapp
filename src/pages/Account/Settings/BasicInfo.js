import React, { useEffect } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Button, Col, Row, Card } from 'antd';
import { connect } from 'dva';
import HeaderWrapper from '@/components/HeaderWrapper';
import AvatarUpload from '@/components/Upload/Avatar';
import { loggedInUserSelector } from '@/selectors/global';
import PageLoading from '@/components/PageLoading';
import { setFormWithError } from '@/utils/forms';
import styles from './BasicInfo.less';

const BasicInfo = ({ currentUser, submitting, form, validation, dispatch }) => {
  useEffect(() => {
    if (validation) {
      setFormWithError(form, validation);
    }
  }, [validation]);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'user/updateUserInfo',
          payload: values,
        });
      }
    });
  };

  const onUploadAvatar = file =>
    dispatch({
      type: 'user/updateAvatar',
      payload: file,
    });

  if (!currentUser) {
    return <PageLoading />;
  }

  const { getFieldDecorator } = form;

  return (
    <>
      <HeaderWrapper title="Informações básicas" />
      <Card bordered={false}>
        <Row gutter={16} className={styles.baseView}>
          <Col xl={12} lg={24}>
            <Form layout="vertical" onSubmit={handleSubmit} hideRequiredMark>
              <Form.Item label={formatMessage({ id: 'app.settings.basic.email' })}>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: false,
                      message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                    },
                  ],
                  initialValue: currentUser.email,
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
                  initialValue: currentUser.name,
                })(
                  <Input
                    maxLength={255}
                    placeholder={formatMessage({ id: 'app.settings.basic.name-placeholder' })}
                  />
                )}
              </Form.Item>
              <Form.Item label={formatMessage({ id: 'app.settings.basic.username' })}>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'app.settings.basic.username-message' }, {}),
                    },
                  ],
                  initialValue: currentUser.username,
                })(
                  <Input
                    maxLength={255}
                    placeholder={formatMessage({ id: 'app.settings.basic.username-placeholder' })}
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
              <div className={styles.avatar_title}>
                <FormattedMessage id="app.settings.basic.avatar" defaultMessage="Avatar" />
              </div>
              <AvatarUpload name="avatar" avatar={currentUser.avatar} onUpload={onUploadAvatar} />
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default connect(state => ({
  currentUser: loggedInUserSelector(state),
  validation: state.validation['user/updateUserInfo'],
  submitting: state.loading.effects['user/updateUserInfo'],
}))(Form.create()(BasicInfo));
