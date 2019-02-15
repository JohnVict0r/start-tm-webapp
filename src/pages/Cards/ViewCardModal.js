import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Modal, Collapse, Form, Row, Col } from 'antd';
import CommentForm from '@/components/Form/Comment';
import CommentList from '@/components/List/Comment';
import AvatarList from '@/components/AvatarList';
import Link from 'umi/link';
import { cardSelectorWithMembers } from './selectors/members';

import styles from './ViewCardModal.less';

@connect((state, ownProps) => {
  const cardSelector = cardSelectorWithMembers({ cardId: ownProps.match.params.cardId });
  return {
    validation: state.createBoard.validation,
    card: cardSelector(state),
    submitting: state.loading.effects['commentCard/save'],
  };
})
@Form.create()
class ViewCardModal extends PureComponent {
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
  };

  handleClose = () => {
    const { match, history } = this.props;
    const parentRoute = match.url.replace(/\/cards\/[0-9]*/i, '');
    history.replace(parentRoute);
  };

  render() {
    const { card, form, submitting, match } = this.props;
    return (
      <Modal
        className={styles.modal}
        width={768}
        maskStyle={{
          animation: '0',
        }}
        title={card.name}
        footer={null}
        onCancel={this.handleClose}
        maskClosable
        visible
      >
        <Row>
          <Col span={24}>Participantes:</Col>
          <Col span={24}>
            <AvatarList size="mini" overlap={0}>
              {card.members.map(member => (
                <AvatarList.Item
                  key={`${card.id}-avatar-${member.id}`}
                  src={member.pictureUrl}
                  tips={member.name}
                />
              ))}
            </AvatarList>
          </Col>
        </Row>
        <Row>
          <Col span={24}>Descrição:</Col>
          <Col span={24}>{card.description}</Col>
        </Row>
        <div>
          <Link to={`/projects/${match.params.projectId}/cards/${match.params.cardId}/edit`}>
            <FormattedMessage id="app.card.edit" />
          </Link>
        </div>
        <div>
          <CommentList />
        </div>
        <div>
          <Collapse>
            <Collapse.Panel header={formatMessage({ id: 'app.card.comment' })} key="1">
              <CommentForm form={form} onSubmit={this.handleSubmit} submiting={submitting} />
            </Collapse.Panel>
          </Collapse>
        </div>
      </Modal>
    );
  }
}

export default ViewCardModal;