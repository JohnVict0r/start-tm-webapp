import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Empty, Row, Select, Badge, Icon, Avatar, Tooltip, Spin } from 'antd';
import { usersSelector } from '@/selectors/search';

import styles from './Participants.less';

@connect((state) => ({
  users: usersSelector(state),
  searching: state.loading.effects['search/searchUserInProject'],
}))
class ParticipantsForm extends PureComponent {
  state = {
    selected: '',
  };

  handleChange = value => {
    const { onSubmit } = this.props;
    onSubmit(value);
  };

  handleSearch = value => {
    const { dispatch, projectId } = this.props;
    dispatch({
      type: 'search/searchUserInProject',
      payload: {
        id: projectId,
        query: value,
      },
    });
  };

  render() {
    const { participants, users, onRemove, searching } = this.props;
    const { selected } = this.state;

    const { Option } = Select;

    const participantsIds = participants.map(i => i.id);
    const filteredOptions = users.filter(user => !participantsIds.includes(user.id));

    return (
      <div style={{ width: '200px' }}>
        <Row>
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
            {filteredOptions &&
              filteredOptions.map(user => <Option key={user.id}>{user.name}</Option>)}
          </Select>
        </Row>
        <Row className={participants.length > 0 ? styles.listParticipants : styles.noParticipants}>
          {participants.length > 0 ? (
            participants.map(p => (
              <Badge
                key={p.id}
                className={styles.participant}
                count={
                  <Icon
                    onClick={() => onRemove(p.id)}
                    type="close-circle"
                    theme="filled"
                    style={{ color: '#f5222d' }}
                  />
                }
              >
                <Tooltip key={p.id} placement="bottom" title={p.name}>
                  <Avatar size="mini" src={p.pictureUrl} />
                </Tooltip>
              </Badge>
            ))
          ) : (
            <Empty style={{ paddingTop: '8px' }} description='Adiciona participantes' />
          )}
        </Row>
      </div>
    );
  }
}

export default ParticipantsForm;
