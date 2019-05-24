import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Divider, Modal, Row, Form, Typography } from 'antd';
import { cardSelectorWithMembers } from './selectors/members';
import CommentSection from '../Comments/CommentSection';
import Participants from './Participants';
import MilestoneForm from './Milestone';
import Assignees from './Assignees';
import Attachments from './Attachments';
import Due from './Due';

import styles from './CardView.less';

@connect((state, ownProps) => {
  const cardSelector = cardSelectorWithMembers({ cardId: ownProps.match.params.cardId });
  return {
    card: cardSelector(state),
  };
})
@Form.create()
class CardView extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'cards/fetch',
      payload: match.params.cardId,
    });
  }

  handleUpdateCard = (field, value) => {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'cards/save',
      payload: {
        id: match.params.cardId,
        card: {
          [field]: value,
        },
      },
    });
  };

  handleRemoveAssignee = value => {
    const { dispatch, card } = this.props;

    dispatch({
      type: 'cards/unAssiginee',
      payload: {
        id: card.id,
        userId: value,
      },
    });
  };

  handleAddAssignee = value => {
    const { dispatch, card } = this.props;

    dispatch({
      type: 'cards/assiginee',
      payload: {
        id: card.id,
        userId: value,
      },
    });
  };

  handleAssignMember = value => {
    const { dispatch, card } = this.props;

    dispatch({
      type: 'cards/assigin',
      payload: {
        id: card.id,
        userId: value,
      },
    });
  };

  handleUnAssignMember = userId => {
    const { dispatch, card } = this.props;

    dispatch({
      type: 'cards/unAssigin',
      payload: {
        id: card.id,
        userId,
      },
    });
  };

  onUploadFile = file => {
    const { dispatch, card } = this.props;
    return dispatch({
      type: 'cards/uploadFile',
      payload: {
        file,
        cardId: card.id,
      },
    });
  };

  onDeleteFile = file => {
    const { dispatch, card } = this.props;

    return dispatch({
      type: 'cards/removeFile',
      payload: {
        fileId: file.uid,
        cardId: card.id,
      },
    });
  };

  handleClose = () => {
    const { match, history } = this.props;
    const parentRoute = match.url.replace(/\/cards\/[0-9]*/i, '');
    history.replace(parentRoute);
  };

  render() {
    const { card } = this.props;

    const propsUpload = {
      fileList: card.media.map(file => {
        return {
          uid: file.id,
          name: file.fileName,
          url: file.url,
        };
      }),
    };

    // const cover = card.media.find(i => i.mimeType === 'image/jpeg' || i.mimeType === 'image/png');
    /* {cover && (
      <div className={styles.headerImage} style={{ backgroundImage: `url(${cover.url})` }} />
    )} */

    return (
      <Modal
        className={styles.modal}
        width={1200}
        maskStyle={{
          animation: '0',
        }}
        maskClosable={false}
        footer={null}
        onCancel={this.handleClose}
        visible
      >
        <section className={styles.main}>
          <div className={styles.content}>
            <Row>
              <Typography.Title
                level={4}
                editable={{ onChange: value => this.handleUpdateCard('name', value) }}
              >
                {card.name}
              </Typography.Title>
              <Typography.Text
                editable={{ onChange: value => this.handleUpdateCard('description', value) }}
              >
                {card.description}
              </Typography.Text>
            </Row>
            <Divider />
            <CommentSection commentableType="cards" commentableId={card.id} />
          </div>
          <div className={styles.aside}>
            <Assignees
              teamId={card.teamId}
              participants={card.assignees}
              onSubmit={this.handleAddAssignee}
              onRemove={this.handleRemoveAssignee}
            />
            <Participants
              teamId={card.teamId}
              participants={card.members}
              onSubmit={this.handleAssignMember}
              onRemove={this.handleUnAssignMember}
            />
            <Due current={card} />
            <MilestoneForm card={card} />
            <Attachments
              propsUpload={propsUpload}
              onUploadFile={this.onUploadFile}
              onDeleteFile={this.onDeleteFile}
            />
          </div>
        </section>
      </Modal>
    );
  }
}

export default CardView;
