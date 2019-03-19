import React, { PureComponent } from 'react';
import { Upload, Spin, Button } from 'antd';

class Attachment extends PureComponent {
  state = {
    fileList: [],
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
    const { name } = this.props;
    const { fileList, uploading } = this.state;

    return (
      <Upload
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
        showUploadList={false}
        name={name}
        defaultFileList={fileList}
        // fileList={fileList}
        accept="*"
      >
        <Spin spinning={uploading}>
          <Button block icon="paper-clip">
            Anexo
          </Button>
        </Spin>
      </Upload>
    );
  }
}
export default Attachment;
