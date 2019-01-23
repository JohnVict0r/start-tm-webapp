import { createSelector } from 'reselect';

// eslint-disable-next-line
export const makeWorkflowSelector = ({ id }) =>
  createSelector(
    /**
    state => state.entities.projects,
    state => state.entities.teams,
    state => state.entities.users,
    state => state.entities.workflows,
    workflows, projects, teams, users) => {
      const workflow = workflows[id];
      console.log(workflow);
      console.log(projects);
      if (workflow) {
        const { schema, id: ownerId } = workflow.owner;

        // revisar
        let owner;

        if (schema === 'projects') {
          owner = projects[ownerId];
        } else if (schema === 'teams') {
          owner = teams[ownerId];
        } else {
          // verificar se será a nivel de sistema, se o usuario for administrador, ou seja, disponivel para todos ou se será apenas pra o usuário que criou
          owner = users[ownerId];
        }

        return { ...workflow, owner };
      }

      return undefined;
    }
    */

    state => state.entities.workflows,
    (collection, workflows) => ({
      items: collection.items.map(() => workflows[id]),
      pagination: collection.pagination,
    })
  );
