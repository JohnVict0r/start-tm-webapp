/**
 * Definição do esquema do estado da aplicação.
 * Utilizando o normalizr https://github.com/paularmstrong/normalizr
 */

import { schema } from 'normalizr';

const User = new schema.Entity('users');
const Status = new schema.Entity('status');
const Role = new schema.Entity('roles');
const Team = new schema.Entity('teams');
const TeamMember = new schema.Object({
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
const Project = new schema.Entity(
  'projects',
  {},
  {
    processStrategy: entity => ({
      ...entity,
      owner: {
        type: entity.owner.type,
        ...entity.owner.model,
      },
    }),
  }
);
const Board = new schema.Entity('boards');
const CardList = new schema.Entity('cardlists');
const Card = new schema.Entity('cards');
const Comment = new schema.Entity('comments');

const UserOrTeams = new schema.Union(
  {
    users: User,
    teams: Team,
  },
  entity => entity.type
);

User.define({
  role: Role,
});

Team.define({
  creator: User,
  loggedInUser: {
    role: Role,
  },
});

TeamMember.define({
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
  owner: UserOrTeams,
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
});

Comment.define({
  commented: User,
  commentable: Card,
});

const Schemas = {
  USER: User,
  USER_ARRAY: [User],
  STATUS: Status,
  STATUS_ARRAY: [Status],
  ROLE: Role,
  ROLE_ARRAY: [Role],
  TEAM: Team,
  TEAM_ARRAY: [Team],
  TEAMMEMBER: TeamMember,
  TEAMMEMBER_ARRAY: [TeamMember],
  PROJECTMEMBER: ProjectMember,
  PROJECTMEMBER_ARRAY: [ProjectMember],
  WORKFLOW: Workflow,
  WORKFLOW_ARRAY: [Workflow],
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
