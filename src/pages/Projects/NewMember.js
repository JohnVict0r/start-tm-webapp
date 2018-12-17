import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Link from 'umi/link';
import { Button, Col, Form, Icon, Row, Spin, Select } from 'antd';
import { usersSelector } from '@/selectors/search';
import { rolesSelector } from '@/selectors/global';

@connect(state => ({
  users: usersSelector(state),
  roles: rolesSelector(state),
  submitting: state.loading.effects['currentProjectMembers/addMember'],
  searching: state.loading.effects['search/searchUserNotInProject'],
}))
@Form.create()
class NewMember extends PureComponent {
  static propTypes = {
    projectId: PropTypes.string,
  };

  static defaultProps = {
    projectId: null,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchRoles',
    });
  }

  handleSearchUser = value => {
    const { dispatch, projectId } = this.props;
    dispatch({
      type: 'search/searchUserNotInProject',
      payload: {
        id: projectId,
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
      roles,
      searching,
      submitting,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark>
        <Row gutter={16}>
          <Col lg={15} md={24}>
            <Form.Item help="Busque por nome ou email">
              {getFieldDecorator('user_id', {
                rules: [{ required: true, message: 'Por favor informe o nome do projeto!' }],
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
          <Col lg={6} md={24}>
            <Form.Item
              help={
                <span>
                  <Link to="/">Leia mais</Link> sobre permissões de papéis.
                </span>
              }
            >
              {getFieldDecorator('role', {
                rules: [{ required: true, message: 'Por favor informe o nome do projeto!' }],
              })(
                <Select placeholder="Papel">
                  {roles.map(r => (
                    <Select.Option key={r.id}>{r.name}</Select.Option>
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
