import React, { PureComponent } from 'react';
import { Button, Upload } from 'antd';
import { FormattedMessage } from 'umi/locale';
import styles from '../../../pages/Account/Settings/BasicInfo.less';

class AvatarUpload extends PureComponent {
  render() {
    const { callback, uploadProps } = this.props;

    const uploaded = ({ file }) => {
      if (file.status === 'done') {
        callback(file);
      }
    };

    return (
      <Upload
        onChange={uploaded}
        showUploadList={false}
        multiple={false}
        name="picture_url"
        accept="image/*"
        {...uploadProps}
      >
        <div className={styles.button_view}>
          <Button icon="upload">
            <FormattedMessage
              name="picture_url"
              id="app.settings.basic.change-avatar"
              defaultMessage="Change avatar"
            />
          </Button>
        </div>
      </Upload>
    );
  }
}
export default AvatarUpload;
