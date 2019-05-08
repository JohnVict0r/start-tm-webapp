import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Button, Modal, Row, Col, Form, List, Popover, Upload } from 'antd';
import AvatarList from '@/components/AvatarList';
import { cardSelectorWithMembers } from './selectors/members';
import styles from './ViewCardModal.less';
import CommentSection from '../Comments/CommentSection';
import ParticipantsForm from './Participants';
import MilestoneForm from './Milestone';
import { FormattedMessage, formatMessage } from 'umi/locale';
import Due from './Due';
import Attachment from '@/components/Upload/Attachment';

@connect((state, ownProps) => {
  const cardSelector = cardSelectorWithMembers({ cardId: ownProps.match.params.cardId });
  return {
    card: cardSelector(state),
  };
})
@Form.create()
class ViewCardModal extends PureComponent {
  state = {
    visibleFormDue: false,
    visibleFormParticipants: false,
    visibleFormMilestone: false,
  };

  handleVisibleDueChange = visibleFormDue => {
    this.setState({ visibleFormDue });
  };

  handleVisibleParticipantsChange = visibleFormParticipants => {
    this.setState({ visibleFormParticipants });
  };

  handleVisibleMilestoneChange = visibleFormMilestone => {
    this.setState({ visibleFormMilestone });
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

    const { visibleFormDue, visibleFormParticipants, visibleFormMilestone } = this.state;

    const textTitleParticipantsForm = <span>Participantes</span>;

    const propsUpload = {
      fileList: card.files.map(file => {
        return {
          uid: file.id,
          name: file.fileName,
          url: file.url,
        };
      }),
    };

    const cover = card.files.find(i => i.mimeType === 'image/jpeg' || i.mimeType === 'image/png');

    return (
      <Modal
        className={styles.modal}
        width={768}
        maskStyle={{
          animation: '0',
        }}
        footer={null}
        onCancel={this.handleClose}
        maskClosable
        visible
      >
        {cover && (
          <div className={styles.headerImage} style={{ backgroundImage: `url(${cover.url})` }} />
        )}
        <Row className={styles.cardTitle}>{card.name}</Row>
        <Row gutter={24}>
          <Col xs={24} sm={18}>
            <Row>
              <Col span={24} className={styles.cardListInfo}>
                <Row gutter={12}>
                  <Col xs={24} sm={12}>
                    <Row className={styles.label}>Participantes</Row>
                    <Row>
                      {card.members && card.members.length > 0 ? (
                        <AvatarList size="mini" overlap={0}>
                          {card.members.map(member => (
                            <AvatarList.Item
                              key={`${card.id}-avatar-${member.id}`}
                              src={member.avatar}
                              tips={member.name}
                            />
                          ))}
                        </AvatarList>
                      ) : (
                        '--'
                      )}
                    </Row>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Row className={styles.label}>Data de entrega</Row>
                    <Row>{card.due ? moment(card.due).format('LLL') : '--'}</Row>
                  </Col>
                </Row>
                {card.description && (
                  <Row>
                    <Col className={styles.label} span={24}>
                      Descrição
                    </Col>
                    <Col span={24}>{card.description}</Col>
                  </Row>
                )}
                {card.files.length > 0 &&
                  <Row>
                    <Col className={styles.label} span={24}>
                      Anexos
                    </Col>
                    <Col className={styles.commentsContainer} span={24}>
                      <Upload {...propsUpload} onRemove={this.onDeleteFile}/>
                    </Col>
                  </Row>
                }
              </Col>
              <Col className={styles.commentsContainer} span={24}>
                <CommentSection commentableType="cards" commentableId={card.id} />
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={6}>
            <List header="Ações" className={styles.actionList} size="small" bordered={false}>
              {/* <List.Item>
                <Button
                  block
                  icon="edit"
                  onClick={() =>
                    router.push(
                      `/teams/${match.params.teamId}/cards/${match.params.cardId}/edit`
                    )
                  }
                >
                  Editar
                </Button>
              </List.Item> */}
              <List.Item>
                <Popover
                  visible={visibleFormParticipants}
                  onVisibleChange={this.handleVisibleParticipantsChange}
                  title={textTitleParticipantsForm}
                  content={
                    <ParticipantsForm
                      teamId={card.teamId}
                      participants={card.members}
                      onSubmit={this.handleAssignMember}
                      onRemove={this.handleUnAssignMember}
                    />
                  }
                  trigger="click"
                >
                  <Button block icon="team">
                    Participantes
                  </Button>
                </Popover>
              </List.Item>
              <List.Item>
                <Popover
                  visible={visibleFormDue}
                  onVisibleChange={this.handleVisibleDueChange}
                  title={<span>Alterar prazo de entrega</span>}
                  content={
                    <Due current={card} onClose={() => this.handleVisibleDueChange(false)} />
                  }
                  trigger="click"
                >
                  <Button block icon="schedule">
                    Data entrega
                  </Button>
                </Popover>
              </List.Item>
              <List.Item>
                <Attachment name="file" onUpload={this.onUploadFile} block />
              </List.Item>
              <List.Item>
                <Popover
                  visible={visibleFormMilestone}
                  onVisibleChange={this.handleVisibleMilestoneChange}
                  title={formatMessage({ id: 'app.card.assign-milestone' }, {})}
                  content={
                    <MilestoneForm
                      teamId={card.teamId}
                      current={card}
                      onClose={() => this.handleVisibleMilestoneChange(false)}
                      onSubmit={this.handleAssignMilestone}
                      onRemove={this.handleUnAssignMilestone}
                    />
                  }
                  trigger="click"
                >
                  <Button block icon="switcher">
                    <FormattedMessage id="app.card.milestone" defaultMessage="Security Settings" />
                  </Button>
                </Popover>
              </List.Item>
            </List>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default ViewCardModal;
