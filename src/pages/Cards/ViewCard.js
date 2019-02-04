import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {Card, Collapse, Form} from 'antd';
import CommentForm from '@/components/Form/Comment';
import CommentList from '@/components/List/Comment';
import AvatarList from '@/components/AvatarList';
import Link from "umi/link";
import { cardSelectorWithMembers } from "./selectors/members";



@connect((state, ownProps) => {
  const cardSelector = cardSelectorWithMembers({ cardId: ownProps.match.params.id });
  return {
    validation: state.createBoard.validation,
    cardList: state.entities.cardlists[ownProps.match.params.cardlistId],
    card: cardSelector(state),
    submitting: state.loading.effects['commentCard/save']
  }
})
@Form.create()
class ViewCard extends PureComponent {
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


  render() {
    const { cardList, card, form, submitting,match } = this.props;
    return (
      <Card bordered={false} title={cardList.name}>
        <div>{formatMessage({id:'app.card.members'})}</div>
        <div>
          <AvatarList
            size="large"
          >
            {card.members.map(member => (
              <AvatarList.Item
                key={`${card.id}-avatar-${member.id}`}
                src={member.pictureUrl}
                tips={member.name}
              />
            ))}
          </AvatarList>
        </div>
        <div>
          {card.name}
        </div>
        <div>
          {card.description}
        </div>
        <div>
          <Link to={`/projects/${match.params.projectId}/boards/${match.params.boardId}/cardList/${cardList.id}/cards/${card.id}/edit`}>
            <FormattedMessage id='app.card.edit' />
          </Link>
        </div>
        <div>
          <CommentList />
        </div>
        <div>
          <Collapse>
            <Collapse.Panel header={formatMessage({id:'app.card.comment'})} key="1">
              <CommentForm
                form={form}
                onSubmit={this.handleSubmit}
                submiting={submitting}
              />
            </Collapse.Panel>
          </Collapse>
        </div>
      </Card>
    );
  }
}

export default ViewCard;
