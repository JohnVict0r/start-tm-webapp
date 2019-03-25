import React, { PureComponent } from 'react';
import { Form, Select, Badge, Icon, Avatar } from 'antd';

@Form.create()
class ParticipantsForm extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      onSubmit(err, values);
    });
  };

  render() {
    const { participants, teamMembers } = this.props;

    const { Option } = Select;

    return (
      <div>
        <Select
          mode="multiple"
          labelInValue
          placeholder="Select users"
          filterOption={false}
          onSearch={this.fetchUser}
          onChange={this.handleChange}
          style={{ width: '100%' }}
        >
          {teamMembers && teamMembers.map(d => <Option key={d.id}>{d.name}</Option>)}
        </Select>
        {participants &&
          participants.map(p => (
            <Badge count={<Icon type="close-circle" theme="filled" style={{ color: '#f5222d' }} />}>
              <Avatar src={p.pictureUrl} shape="square" />
            </Badge>
          ))}
      </div>
    );
  }
}

export default ParticipantsForm;
