import React, { PureComponent } from 'react';
import { Upload } from 'antd';
import Attachment from '@/components/Upload/Attachment';

class Attachments extends PureComponent {
  render() {
    const { propsUpload, onUploadFile, onDeleteFile } = this.props;
    return (
      <div style={{ maxWidth: '250px' }}>
        <Attachment
          style={{ display: 'block', padding: '8px 0'}}
          name="file"
          onUpload={onUploadFile}
          block
        />
        <Upload {...propsUpload} onRemove={onDeleteFile} />
      </div>
    );
  }
}

export default Attachments;
