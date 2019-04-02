import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Button, Modal, Row, Col, Form, List, Popover } from 'antd';
import AvatarList from '@/components/AvatarList';
import router from 'umi/router';
import { cardSelectorWithMembers } from './selectors/members';
import styles from './ViewCardModal.less';
import { DueForm, PriorityForm } from '@/components/Form/Card';
import CommentSection from '../Comments/CommentSection';
import ParticipantsForm from './Participants';

@connect((state, ownProps) => {
  const cardSelector = cardSelectorWithMembers({ cardId: ownProps.match.params.cardId });
  return {
    card: cardSelector(state)
  };
})
@Form.create()
class ViewCardModal extends PureComponent {
  state = {
    visibleFormDue: false,
    visibleFormPriority: false,
    visibleFormParticipants: false,
  };

  handleVisibleDueChange = visibleFormDue => {
    this.setState({ visibleFormDue });
  };

  handleSubmitDueForm = (err, values) => {
    if (!err) {
      const { dispatch, card } = this.props;

      dispatch({
        type: 'saveCard/save',
        payload: {
          id: card.id,
          card: { ...values },
        },
      });

      this.setState({
        visibleFormDue: false,
      });
    }
  };

  handleVisiblePriorityChange = visibleFormPriority => {
    this.setState({ visibleFormPriority });
  };

  handleVisibleParticipantsChange = visibleFormParticipants => {
    this.setState({ visibleFormParticipants });
  };

  handleSubmitPriorityForm = (err, values) => {
    if (!err) {
      const { dispatch, card } = this.props;

      dispatch({
        type: 'saveCard/save',
        payload: {
          id: card.id,
          card: { ...values },
        },
      });

      this.setState({
        visibleFormPriority: false,
      });
    }
  };

  handleAssignMember = value => {
    const { dispatch, card } = this.props;

    dispatch({
      type: 'saveCard/assigin',
      payload: {
        id: card.id,
        userId: value,
      },
    });
  };

  handleUnAssignMember = userId => {
    const { dispatch, card } = this.props;

    dispatch({
      type: 'saveCard/unAssigin',
      payload: {
        id: card.id,
        userId,
      },
    });
  };

  handleClose = () => {
    const { match, history } = this.props;
    const parentRoute = match.url.replace(/\/cards\/[0-9]*/i, '');
    history.replace(parentRoute);
  };

  render() {
    const {
      card,
      match,
    } = this.props;

    const { visibleFormDue, visibleFormPriority, visibleFormParticipants } = this.state;

    const textTitleDueForm = <span>Alterar prazo de entrega</span>;

    const textTitlePriorityForm = <span>Alterar prioridade</span>;

    const textTitleParticipantsForm = <span>Participantes</span>;

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
        <Row className={styles.cardTitle}>{card.name}</Row>
        <Row gutter={24}>
          <Col xs={24} sm={18}>
            <Row>
              <Col span={24} className={styles.cardListInfo}>
                <Row gutter={12}>
                  <Col xs={24} sm={12}>
                    <Row className={styles.label}>Participantes</Row>
                    <Row>
                      <AvatarList size="mini" overlap={0}>
                        {card.members.map(member => (
                          <AvatarList.Item
                            key={`${card.id}-avatar-${member.id}`}
                            src={member.pictureUrl}
                            tips={member.name}
                          />
                        ))}
                      </AvatarList>
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
              </Col>
              <Col className={styles.commentsContainer} span={24}>
                <CommentSection
                  commentableType='cards'
                  commentableId={card.id}
                />
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={6}>
            <List header="Ações" className={styles.actionList} size="small" bordered={false}>
              <List.Item>
                <Button
                  block
                  icon="edit"
                  onClick={() =>
                    router.push(
                      `/projects/${match.params.projectId}/cards/${match.params.cardId}/edit`
                    )
                  }
                >
                  Editar
                </Button>
              </List.Item>
              <List.Item>
                <Popover
                  visible={visibleFormParticipants}
                  onVisibleChange={this.handleVisibleParticipantsChange}
                  title={textTitleParticipantsForm}
                  content={
                    <ParticipantsForm
                      projectId={card.projectId}
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
                  visible={visibleFormPriority}
                  onVisibleChange={this.handleVisiblePriorityChange}
                  title={textTitlePriorityForm}
                  content={<PriorityForm current={card} onSubmit={this.handleSubmitPriorityForm} />}
                  trigger="click"
                >
                  <Button block icon="flag">
                    Prioridade
                  </Button>
                </Popover>
              </List.Item>
              <List.Item>
                <Popover
                  visible={visibleFormDue}
                  onVisibleChange={this.handleVisibleDueChange}
                  title={textTitleDueForm}
                  content={<DueForm current={card} onSubmit={this.handleSubmitDueForm} />}
                  trigger="click"
                >
                  <Button block icon="schedule">
                    Data entrega
                  </Button>
                </Popover>
              </List.Item>
              <List.Item>
                <Button block icon="paper-clip">
                  Anexo
                </Button>
              </List.Item>
            </List>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default ViewCardModal;
