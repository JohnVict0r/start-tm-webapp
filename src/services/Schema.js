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
const TeamMember = new schema.Object({
  user: User,
  role: Role,
});
const Project = new schema.Entity('projects');
const Team = new schema.Entity('teams');
const Board = new schema.Entity('boards');
const Milestone = new schema.Entity('milestones');
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

TeamMember.define({
  user: User,
  role: Role,
});

Project.define({
  creator: User,
  loggedInUser: {
    role: Role,
  },
});

Team.define({
  creator: User,
});

Board.define({
  creator: User,
  cardlists: [CardList],
});

Milestone.define({
  creator: User,
});

CardList.define({
  status: Status,
  cards: [Card],
});

Card.define({
  creator: User,
  members: [User],
  assignees: [User],
  comments: [Comment],
  milestone:Milestone
});

Comment.define({
  commented: User,
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
  TEAMMEMBER: TeamMember,
  TEAMMEMBER_ARRAY: [TeamMember],
  PROJECT: Project,
  PROJECT_ARRAY: [Project],
  TEAM: Team,
  TEAM_ARRAY: [Team],
  BOARD: Board,
  BOARD_ARRAY: [Board],
  MILESTONE: Milestone,
  MILESTONE_ARRAY: [Milestone],
  CARDLIST: CardList,
  CARDLIST_ARRAY: [CardList],
  CARD: Card,
  CARD_ARRAY: [Card],
  COMMENT: Comment,
  COMMENT_ARRAY: [Comment],
};

export default Schemas;
