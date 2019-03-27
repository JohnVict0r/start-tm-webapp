import React, { PureComponent } from 'react';
import { Row, Select, Badge, Icon, Avatar, Tooltip } from 'antd';
import styles from './index.less';

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
      <div style={{ width: '200px' }}>
        <Row>
          <Select
            value={selected}
            showSearch
            placeholder="Select users"
            filterOption={false}
            onSearch={this.fetchUser}
            onChange={this.handleChange}
            style={{ width: '200px' }}
          >
            {filteredOptions &&
              filteredOptions.map(d => <Option key={d.user.id}>{d.user.name}</Option>)}
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
            <span>Não existem participantes</span>
          )}
        </Row>
      </div>
    );
  }
}

export default ParticipantsForm;
