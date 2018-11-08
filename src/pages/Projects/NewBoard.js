import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Form, Input } from 'antd';
// import Link from 'umi/link';
// import { Select } from 'antd/lib/select';
import { makeProjectSelector } from './selectors/projects';

@connect((state, ownProps) => {
  const { match } = ownProps;
  const projectSelector = makeProjectSelector({ id: match.params.id });
  return {
    project: projectSelector(state),
  };
})
@Form.create()
class Board extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      onSubmit(err, values);
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      // project,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <Card bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Nome do quadro" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Por favor informe o nome do quadro!' }],
            })(<Input placeholder="Insita o nome do quadro" />)}
          </Form.Item>
          {/* <Form.Item
            label="Fluxo de trabalho"
            {...formItemLayout}
            help={
              <span>
                Você também pode criar um novo fluxo de trabalho{' '}
                <Link to={`/teams/${project.owner.id}/workflows/new`}>aqui</Link>.
              </span>
            }
          >
            {getFieldDecorator('workflow', {
              rules: [{ required: true, message: 'Por favor selecione uma equipe!' }],
            })(
              <Select placeholder="Equipe" disabled={loadingTeamOptions}>
                {teams.map(r => (
                  <Select.Option key={r.id}>{r.name}</Select.Option>
                ))}
              </Select>
            )}
          </Form.Item> */}
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button
              type="primary"
              htmlType="submit"
              // loading={submitting}
            >
              Criar Quadro
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Board;
