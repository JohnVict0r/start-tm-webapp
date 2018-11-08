export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    Routes: ['src/pages/Authenticated'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      {
        path: '/teams',
        name: 'teams',
        icon: 'team',
        hideInBreadcrumb: true,
        routes: [
          { path: '/teams', redirect: '/teams/explore' },
          {
            path: '/teams/explore',
            name: 'my-teams',
            component: './Teams/TeamsList',
          },
          {
            path: '/teams/:id',
            name: 'team',
            component: './Teams/ViewTeam',
            hideInMenu: true,
            routes: [
              { path: '/teams/:id', redirect: '/teams/:id/projects' },
              {
                path: '/teams/:id/projects',
                name: 'projects',
                component: './Teams/Projects',
              },
              {
                path: '/teams/:id/workflows',
                name: 'workflows',
                component: './Teams/Workflows',
              },
              {
                path: '/teams/:id/members',
                name: 'members',
                component: './Teams/Members',
              },
            ],
          },
        ],
      },
      {
        path: '/projects',
        name: 'projects',
        icon: 'project',
        hideInBreadcrumb: true,
        routes: [
          { path: '/projects', redirect: '/projects/explore' },
          {
            path: '/projects/explore',
            name: 'my-projects',
            component: './Projects/ProjectsList',
          },
          {
            path: '/projects/new',
            name: 'new-project',
            component: './Projects/NewProject',
          },
          {
            path: '/projects/:id',
            name: 'project',
            component: './Projects/ViewProject',
            hideInMenu: true,
            routes: [
              // { path: '/projects/:id', redirect: '/projects/:id/projects' },
              // {
              //   path: '/teams/:id/projects',
              //   name: 'projects',
              //   component: './Teams/Projects',
              // },
            ],
          },
        ],
      },
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                name: 'stepform',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseInfo',
              },
              {
                path: '/account/settings/password',
                component: './Account/Settings/PasswordView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        name: 'admin',
        path: '/admin',
        component: './Admin/Menu',
        hideInMenu: true,
        routes: [
          { path: '/admin', redirect: '/admin/workflows' },
          {
            path: '/admin/workflows',
            component: './Admin/Workflows/Workflows',
          },
          /*
          {
            path: '/admin/workflows/new',            
            component: './Admin/Workflows/NewWorkflow',
          },
          */
          {
            path: '/admin/users',
            component: './Admin/Users/Users',
          },
        ],
      },
      {
        path: '/workflows',
        name: 'workflows',
        icon: 'workflows',
        hideInBreadcrumb: true,
        routes: [
          { path: '/workflows', redirect: '/workflows/new' },
          {
            path: '/workflows/new',
            component: './Admin/Workflows/NewWorkflow',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
