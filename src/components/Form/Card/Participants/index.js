import React, { PureComponent } from 'react';
import { Row, Col, Select, Badge, Icon, Avatar, Tooltip } from 'antd';

class ParticipantsForm extends PureComponent {
  state = {
    selected: '',
  };

  handleChange = value => {
    const { onSubmit } = this.props;
    onSubmit(value);
  };

  render() {
    const { participants, projectMembers, onRemove } = this.props;
    const { selected } = this.state;

    const { Option } = Select;

    const participantsIds = participants.map(i => i.id);
    const filteredOptions = projectMembers.filter(m => !participantsIds.includes(m.user.id));

    return (
      <div>
        <Row>
          <Select
            value={selected}
            showSearch
            placeholder="Select users"
            filterOption={false}
            onSearch={this.fetchUser}
            onChange={this.handleChange}
            style={{ width: '100%' }}
          >
            {filteredOptions &&
              filteredOptions.map(d => <Option key={d.user.id}>{d.user.name}</Option>)}
          </Select>
        </Row>
        <Row>
          {participants &&
            participants.map(p => (
              <Col span={6}>
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
                  <Tooltip key={p.id} placement="topLeft" title={p.name}>
                    <Avatar size="mini" src={p.pictureUrl} />
                  </Tooltip>
                </Badge>
              </Col>
            ))}
        </Row>
      </div>
    );
  }
}

export default ParticipantsForm;
