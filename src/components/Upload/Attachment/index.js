import React, { PureComponent } from 'react';
import { Upload, Button } from 'antd';
import classNames from 'classnames';

import styles from './index.less';

class Attachment extends PureComponent {
  state = {
    uploading: false,
  };

  beforeUpload = () => false;

  handleChange = async info => {
    const { onUpload, name } = this.props;
    // const { fileList } = this.state;

    this.setState({
      uploading: true,
    });

    const formData = new FormData(info.file);
    formData.append(name, info.file);

    await onUpload(formData);

    this.setState({
      uploading: false,
    });
  };

  render() {
    const { name, block } = this.props;
    const { uploading } = this.state;

    return (
      <Upload
        className={classNames({
          [styles.block]: !!block,
        })}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
        showUploadList={false}
        name={name}
        accept="*"
        disabled={uploading}
      >
        <Button block icon="paper-clip" loading={uploading}>
          Anexo
        </Button>
      </Upload>
    );
  }
}
export default Attachment;
