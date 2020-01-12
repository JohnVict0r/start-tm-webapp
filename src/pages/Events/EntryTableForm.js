import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Select, Input, message, Popconfirm, Divider } from 'antd';
import styles from './style.less';

const EntryTypes = [
  {
    type: 'R',
    value: 'Rating',
  },
  {
    type: 'K',
    value: 'Ranking',
  },
  {
    type: 'KK',
    value: '2 Rakings',
  },
  {
    type: 'RK',
    value: 'Rating + Ranking',
  },
  {
    type: 'KKR',
    value: 'Rating + 2 Ranking',
  },
];

export default class EntryTableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  newEntry = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_${this.index}`,
      type: '',
      price: 0,
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({ data: newData });
    onChange(newData);
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  handleSelectChange(value, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = value;
      this.setState({ data: newData });
    }
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.type || !target.price) {
        message.error('preencha os campos para cadastrar');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      const { data } = this.state;
      const { onChange } = this.props;

      this.toggleEditable(e, key);
      target.editable = false;
      delete target.isNew;
      onChange(data);
      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {
    const { data } = this.state;

    const typesCreated = data.map(entry => entry.type);

    const columns = [
      {
        title: 'Tipo da entrada',
        dataIndex: 'type',
        key: 'type',
        width: '50%',
        render: (key, record) => {
          if (record.editable) {
            return (
              <Select
                autoFocus
                onChange={value => this.handleSelectChange(value, 'type', record.key)}
                placeholder="Tipo de entrada"
              >
                {EntryTypes.filter(entry => !typesCreated.includes(entry.type)).map(entry => (
                  <Select.Option key={entry.type}>{entry.value}</Select.Option>
                ))}
              </Select>
            );
          }
          return EntryTypes.filter(entry => entry.type === key)[0].value;
        },
      },
      {
        title: 'Preço',
        dataIndex: 'price',
        key: 'price',
        width: '30%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'price', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="Valor"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'Ações',
        key: 'action',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>Salvar</a>
                  <Divider type="vertical" />
                  <Popconfirm title="Deseja remover?" onConfirm={() => this.remove(record.key)}>
                    <a>Remover</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>Salvar</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>Cancelar</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>Editar</a>
              <Divider type="vertical" />
              <Popconfirm title="Deseja remover?" onConfirm={() => this.remove(record.key)}>
                <a>Remover</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { loading } = this.state;

    return (
      <Fragment>
        <Table
          className="entry-table"
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => {
            return record.editable ? styles.editable : '';
          }}
        />
        {data.length < 5 && (
          <Button
            style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
            type="dashed"
            onClick={this.newEntry}
            icon="plus"
          >
            Adicionar forma de entrada
          </Button>
        )}
      </Fragment>
    );
  }
}
