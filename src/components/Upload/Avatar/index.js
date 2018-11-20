import React, { Fragment, PureComponent } from 'react';
import { Upload, Spin } from 'antd';
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
      <Fragment>
        <Upload
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          showUploadList={false}
          name={name}
          accept="image/*"
          listType="picture-card"
        >
          <div className={styles.avatar}>
            <Spin spinning={uploading}>
              <img src={avatar} alt="avatar" />
            </Spin>
          </div>
        </Upload>
      </Fragment>
    );
  }
}
export default AvatarUpload;
