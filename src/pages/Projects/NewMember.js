import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Col, Form, Icon, Row, Spin, Select } from 'antd';
import { usersSelector } from '@/selectors/search';

@connect(state => ({
  users: usersSelector(state),
  submitting: state.loading.effects['currentProjectMembers/addMember'],
  searching: state.loading.effects['search/searchUser'],
}))
@Form.create()
class NewMember extends PureComponent {
  static propTypes = {
    projectId: PropTypes.string,
  };

  static defaultProps = {
    projectId: null,
  };

  handleSearchUser = value => {
    const { dispatch, projectId } = this.props;
    dispatch({
      type: 'search/searchUser',
      payload: {
        model: 'projects',
        id: projectId,
        c: 0,
        query: value,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, projectId } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'currentProjectMembers/addMember',
          payload: {
            id: projectId,
            member: values,
          },
        });
        form.resetFields();
      }
    });
  };

  render() {
    const {
      users,
      searching,
      submitting,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark>
        <Row gutter={16}>
          <Col lg={21} md={24}>
            <Form.Item help="Busque por nome ou email">
              {getFieldDecorator('user_id', {
                rules: [{ required: true, message: 'Informe o nome ou email do usuário!' }],
              })(
                <Select
                  showSearch
                  prefix={<Icon type="user" />}
                  placeholder="Busque por um usuário"
                  notFoundContent={searching ? <Spin size="small" /> : null}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={this.handleSearchUser}
                  onChange={this.handleChange}
                  style={{ width: '100%' }}
                >
                  {users.map(u => (
                    <Select.Option key={u.id}>{u.name}</Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col lg={3} md={24}>
            <Form.Item>
              <Button loading={submitting} block type="primary" htmlType="submit">
                Adicionar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default NewMember;
