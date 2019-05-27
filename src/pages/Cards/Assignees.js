import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Select, Form, Spin, Button, Typography, Avatar, List } from 'antd';
import { usersSelector } from '@/selectors/search';
import AvatarList from '@/components/AvatarList';
import EditableSection from './EditableSection';

@connect(state => ({
  users: usersSelector(state),
  searching: state.loading.effects['search/searchUser'],
}))
@Form.create()
class Assignees extends PureComponent {
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
        c: 1,
        query: value,
      },
    });
  };

  renderEditing = () => {
    const { participants, users, onRemove, searching } = this.props;
    const { selected } = this.state;

    const { Option } = Select;

    const participantsIds = participants.map(i => i.id);
    const filteredOptions = users.filter(user => !participantsIds.includes(user.id));

    return (
      <List
        header={
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
            style={{ width: '100%' }}
          >
            {filteredOptions &&
              filteredOptions.map(user => <Option key={user.id}>{user.name}</Option>)}
          </Select>
        }
        itemLayout="horizontal"
        size="small"
        dataSource={participants}
        rowKey="id"
        renderItem={item => (
          <List.Item>
            <Avatar
              size="small"
              src={item.avatar}
              style={{
                marginRight: '12px',
              }}
            />
            <Typography.Text
              style={{
                flex: 1,
              }}
              ellipsis
            >
              {item.name}
            </Typography.Text>
            <Button type="link" icon="close" onClick={() => onRemove(item.id)} />
          </List.Item>
        )}
      />
    );
  };

  render() {
    const { participants } = this.props;
    return (
      <EditableSection title="Responsáveis" editingComponent={this.renderEditing()}>
        {participants && participants.length > 0 ? (
          <AvatarList size="small" overlap={0}>
            {participants.map(member => (
              <AvatarList.Item key={`avatar-${member.id}`} src={member.avatar} tips={member.name} />
            ))}
          </AvatarList>
        ) : (
          'Não há responsáveis'
        )}
      </EditableSection>
    );
  }
}

export default Assignees;
