import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Button, Modal, Row, Col, Form, List, Popover } from 'antd';
import CommentForm from '@/components/Form/Comment';
import CommentList from '@/components/List/Comment';
import AvatarList from '@/components/AvatarList';
import router from 'umi/router';
import { cardSelectorWithMembers } from './selectors/members';
import { makeCardCommentsSelector } from '@/selectors/global';
import styles from './ViewCardModal.less';
import { DueForm, PriorityForm } from '@/components/Form/Card';

@connect((state, ownProps) => {
  const cardSelector = cardSelectorWithMembers({ cardId: ownProps.match.params.cardId });
  const commentCardSelect = makeCardCommentsSelector({ cardId: ownProps.match.params.cardId });
  return {
    validation: state.createBoard.validation,
    card: cardSelector(state),
    users: state.entities.users,
    comments: commentCardSelect(state),
    logedUser: state.global.loggedInUser,
    submitting: state.loading.effects['commentCard/save'],
  };
})
@Form.create()
class ViewCardModal extends PureComponent {
  state = {
    visibleFormDue: false,
    visibleFormPriority: false,
  };

  componentDidMount() {
    const { dispatch, card } = this.props;
    dispatch({
      type: 'comments/fetchCardComments',
      payload: { id: card.id },
    });
  }

  componentDidUpdate(prevProps) {
    const { form, validation } = this.props;

    if (prevProps.validation !== validation) {
      const { errors } = validation;
      const mapErrors = Object.keys(errors).reduce(
        (accum, key) => ({
          ...accum,
          [key]: {
            value: form.getFieldValue(key),
            errors: errors[key].map(err => new Error(err)),
          },
        }),
        {}
      );

      form.setFields(mapErrors);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, card, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'commentCard/save',
          payload: {
            cardId: card.id,
            comment: { ...values },
          },
        });
      }
    });
    form.resetFields();
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

  handleClose = () => {
    const { match, history } = this.props;
    const parentRoute = match.url.replace(/\/cards\/[0-9]*/i, '');
    history.replace(parentRoute);
  };

  render() {
    const { card, form, submitting, match, comments, users, logedUser } = this.props;

    const { visibleFormDue, visibleFormPriority } = this.state;

    const textTitleDueForm = <span>Alterar prazo de entrega</span>;

    const textTitlePriorityForm = <span>Alterar prioridade</span>;

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
                <CommentForm
                  form={form}
                  user={users[logedUser]}
                  onSubmit={this.handleSubmit}
                  submiting={submitting}
                />
                <CommentList comments={comments} users={users} />
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
                <Button block icon="team">
                  Participantes
                </Button>
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
