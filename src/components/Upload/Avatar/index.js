import React, { PureComponent } from 'react';
import { Avatar, Button, Icon, Upload, Spin } from 'antd';
import styles from './index.less';

class AvatarUpload extends PureComponent {
  state = {
    uploading: false,
  };

  beforeUpload = () => false;

  handleChange = async info => {
    const { onUpload, name } = this.props;

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
    const { avatar, name } = this.props;
    const { uploading } = this.state;

    return (
      <Upload
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
        showUploadList={false}
        name={name}
        accept="image/*"
        disabled={uploading}
      >
        <div className={styles.upload}>
          <div className={styles.avatarWapper}>
            <Spin spinning={uploading}>
              <Avatar
                className={styles.avatar}
                src={avatar}
                alt="avatar"
              />
            </Spin>
          </div>
          <Button>
            <Icon type="upload" /> Selecionar
          </Button>
        </div>
      </Upload>
    );
  }
}
export default AvatarUpload;
