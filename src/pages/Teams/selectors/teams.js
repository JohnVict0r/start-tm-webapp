import { createSelector } from 'reselect';

// export const selectedTeamSelector = createSelector(
//   (state) => state.teams.selected,
//   (state) => state.entities.teams,
//   (selected, teams) => {
//     return teams[selected.id]
//   }
// )

// eslint-disable-next-line
export const exploreTeamsSelector = createSelector(
  state => state.teams.explore,
  state => state.entities.teams,
  (explore, teams) => ({
    items: explore.items.map(id => teams[id]),
    pagination: explore.pagination,
  })
);
//
// export const masterOfTeamsSelector = createSelector(
//   (state) => state.teams.masterOfTeams,
//   (state) => state.entities.teams,
//   (items, teams) => items.map((id) => teams[id])
// )
//
// export const teamWorkflowsSelector = createSelector(
//   (state) => state.teams.selected,
//   (state) => state.entities.workflows,
//   ({ workflows: { items, ...rest } }, workflows) => ({
//     items: items.map((id) => workflows[id]),
//     ...rest
//   })
// )
//
// export const teamProjectsSelector = createSelector(
//   (state) => state.teams.selected,
//   (state) => state.entities.projects,
//   ({ projects: { items, ...rest } }, projects) => ({
//     items: items.map((id) => projects[id]),
//     ...rest
//   })
// )
//
// export const teamMembersSelector = createSelector(
//   (state) => state.teams.selected,
//   (state) => state.teams.members,
//   (state) => state.entities.users,
//   (state) => state.entities.roles,
//   (selected, members, users, roles) => {
//     if (selected.id && members[selected.id]) {
//       return members[selected.id].map((member) => ({
//         user: users[member.user],
//         role: roles[member.role]
//       }))
//     }
//   }
// )
