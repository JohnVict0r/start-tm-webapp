import React, { PureComponent } from 'react';
import { Card } from 'antd';

class EditableSection extends PureComponent {
  state = {
    editing: false
  };

  handleEditing = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
  };

  render() {
    const { title, editingComponent, children } = this.props;
    const { editing } = this.state;
    return (
      <Card
        title={title}
        size="small"
        bordered={false}
        extra={
          <a onClick={this.handleEditing}>
            {editing ? 'Fechar' : 'Editar'}
          </a>
        }
      >
        {editing ? editingComponent : children}
      </Card>
    );
  }
}

export default EditableSection;
