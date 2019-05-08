import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Select, Form, Spin, Row, Badge, Icon, Tooltip, Avatar } from 'antd';
import { usersSelector } from '@/selectors/search';
import styles from './Milestone.less';

@connect(state => ({
  users: usersSelector(state),
  searching: state.loading.effects['search/searchUser'],
}))
@Form.create()
class AssigneeForm extends PureComponent {
  state = {
    selected: '',
  };

  handleChange = value => {
    const { onSubmit } = this.props;
    onSubmit(value);
  };

  handleSearch = value => {
    const { dispatch, teamId } = this.props;
    dispatch({
      type: 'search/searchUser',
      payload: {
        model: 'teams',
        id: teamId,
        query: value,
      },
    });
  };

  render() {
    const { participant, users, onRemove, searching } = this.props;
    const { selected } = this.state;

    const { Option } = Select;

    return (
      <div style={{ width: '200px' }}>
        <Row className={participant > 0 ? styles.listParticipants : styles.noParticipants}>
          {participant ? (
            <Badge
              key={participant.id}
              className={styles.participant}
              count={
                <Icon
                  onClick={() => onRemove(participant.id)}
                  type="close-circle"
                  theme="filled"
                  style={{ color: '#f5222d' }}
                />
              }
            >
              <Tooltip key={participant.id} placement="bottom" title={participant.name}>
                <Avatar size="mini" src={participant.avatar} />
              </Tooltip>
            </Badge>
          ) : (
            <Select
              value={selected}
              showSearch
              placeholder="Selecione"
              notFoundContent={searching ? <Spin size="small" /> : null}
              showArrow={false}
              defaultActiveFirstOption={false}
              filterOption={false}
              onSearch={this.handleSearch}
              onChange={this.handleChange}
              style={{ width: '200px' }}
            >
              {users &&
              users.map(user => <Option key={user.id}>{user.name}</Option>)}
            </Select>
          )}
        </Row>
      </div>
    );
  }
}

export default AssigneeForm;
