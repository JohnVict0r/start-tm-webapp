import React, { PureComponent } from 'react';
import { Card } from 'antd';

class EditableSection extends PureComponent {
  state = {
    editing: false,
  };

  handleEditing = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing,
    });
  };

  render() {
    const { title, actionText = 'Editar', editingComponent, children } = this.props;
    const { editing } = this.state;

    const bodyStyle = editing
      ? {
          padding: '12px',
          background: 'white',
          borderRadius: '4px',
          margin: '0 -12px',
        }
      : undefined;

    return (
      <Card
        title={title}
        size="small"
        bodyStyle={bodyStyle}
        bordered={false}
        extra={<a onClick={this.handleEditing}>{editing ? 'Fechar' : actionText}</a>}
      >
        {editing ? editingComponent : children}
      </Card>
    );
  }
}

export default EditableSection;
