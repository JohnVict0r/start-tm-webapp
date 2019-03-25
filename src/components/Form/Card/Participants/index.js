import React, { PureComponent } from 'react';
import { Select, Badge, Icon, Avatar, Tooltip } from 'antd';

class ParticipantsForm extends PureComponent {
  handleChange = value => {
    const { onSubmit } = this.props;
    onSubmit(value);
  };

  render() {
    const { participants, projectMembers, onRemove } = this.props;

    const { Option } = Select;

    console.log(projectMembers);

    const filteredOptions = projectMembers.filter(o => !participants.includes(o));

    return (
      <div>
        <Select
          showSearch
          labelInValue
          placeholder="Select users"
          filterOption={false}
          onSearch={this.fetchUser}
          onChange={this.handleChange}
          style={{ width: '100%' }}
        >
          {filteredOptions &&
            filteredOptions.map(d => <Option key={d.user.id}>{d.user.name}</Option>)}
        </Select>
        {participants &&
          participants.map(p => (
            <Badge
              key={p.id}
              count={
                <Icon
                  onClick={() => onRemove(p.id)}
                  type="close-circle"
                  theme="filled"
                  style={{ color: '#f5222d' }}
                />
              }
            >
              <Tooltip placement="topLeft" title={p.name}>
                <Avatar src={p.pictureUrl} shape="square" />
              </Tooltip>
            </Badge>
          ))}
      </div>
    );
  }
}

export default ParticipantsForm;
