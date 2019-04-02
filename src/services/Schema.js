/**
 * Definição do esquema do estado da aplicação.
 * Utilizando o normalizr https://github.com/paularmstrong/normalizr
 */

import { schema } from 'normalizr';

const User = new schema.Entity('users');
const Status = new schema.Entity('status');
const Role = new schema.Entity('roles');
const Ted = new schema.Entity('teds');
const Goal = new schema.Entity('goals');
const UserMember = new schema.Object({
  user: User,
  role: Role,
});
const ProjectMember = new schema.Object({
  user: User,
  role: Role,
});
const Workflow = new schema.Entity('workflows');
const WorkflowNode = new schema.Entity('workflowNodes');
const WorkflowTransition = new schema.Entity('workflowTransitions');
const Project = new schema.Entity('projects');
const Board = new schema.Entity('boards');
const CardList = new schema.Entity('cardlists');
const Card = new schema.Entity('cards');
const Comment = new schema.Entity('comments');

User.define({
  role: Role,
});

Ted.define({
  creator: User,
});

Goal.define({
  creator: User,
});

UserMember.define({
  user: User,
  role: Role,
});

ProjectMember.define({
  user: User,
  role: Role,
});

Workflow.define({
  creator: User,
  nodes: [WorkflowNode],
  transitions: [WorkflowTransition],
});

WorkflowNode.define({
  status: Status,
});

WorkflowTransition.define({
  out_workflow_node_id: WorkflowNode,
  in_workflow_node_id: WorkflowNode,
});

Project.define({
  creator: User,
  loggedInUser: {
    role: Role,
  },
});

Board.define({
  creator: User,
  cardlists: [CardList],
});

CardList.define({
  status: Status,
  cards: [Card],
});

Card.define({
  creator: User,
  members: [User],
  comments: [Comment],
});

Comment.define({
  commented: User,
  commentable: Card,
});

const Schemas = {
  USER: User,
  USER_ARRAY: [User],
  USERMEMBER: UserMember,
  USERMEMBER_ARRAY: [UserMember],
  STATUS: Status,
  STATUS_ARRAY: [Status],
  ROLE: Role,
  ROLE_ARRAY: [Role],
  TED: Ted,
  TED_ARRAY: [Ted],
  GOAL: Goal,
  GOAL_ARRAY: [Goal],
  PROJECTMEMBER: ProjectMember,
  PROJECTMEMBER_ARRAY: [ProjectMember],
  WORKFLOW: Workflow,
  WORKFLOW_ARRAY: [Workflow],
  WORKFLOWNODE: WorkflowNode,
  WORKFLOWNODE_ARRAY: [WorkflowNode],
  WORKFLOWTRANSITION: WorkflowTransition,
  WORKFLOWTRANSITION_ARRAY: [WorkflowTransition],
  PROJECT: Project,
  PROJECT_ARRAY: [Project],
  BOARD: Board,
  BOARD_ARRAY: [Board],
  CARDLIST: CardList,
  CARDLIST_ARRAY: [CardList],
  CARD: Card,
  CARD_ARRAY: [Card],
  COMMENT: Comment,
  COMMENT_ARRAY: [Comment],
};

export default Schemas;
