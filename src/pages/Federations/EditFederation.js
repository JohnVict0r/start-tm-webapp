import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Typography, Popconfirm, Icon } from 'antd';
import FederationForm from './FederationForm';

@connect((state, ownProps) => ({
  federation: state.entities.federations[ownProps.match.params.federationId],
}))
class EditFederation extends PureComponent {
  handleDelete = e => {
    e.preventDefault();
    const { federation, dispatch } = this.props;
    dispatch({
      type: 'federations/delete',
      payload: {
        federationId: federation.id,
      },
    });
  };

  render() {
    return (
      <>
        <FederationForm />
        <Card
          title={<Typography.Text type="danger">Apagar Federação</Typography.Text>}
          bordered={false}
          style={{ marginTop: '24px' }}
        >
          <Typography.Paragraph>
            Ao apagar a federação todos os eventos, clubes e atletas serão apagadas.
          </Typography.Paragraph>
          <Typography.Paragraph strong>Esta ação não pode ser desfeita!</Typography.Paragraph>
          <Popconfirm
            title="Tem certeza? Essa ação não pode ser desfeita!"
            icon={<Icon type="exclamation-circle" style={{ color: 'red' }} />}
            onConfirm={this.handleDelete}
            okText="Apagar"
          >
            <Button type="danger">Apagar Federação</Button>
          </Popconfirm>
        </Card>
      </>
    );
  }
}

export default EditFederation;
