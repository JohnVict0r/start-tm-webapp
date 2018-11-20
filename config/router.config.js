export default [
  // auth
  {
    path: '/auth',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/auth', redirect: '/auth/login' },
      { path: '/auth/login', component: './Auth/Login' },
      { path: '/auth/forgot-password', component: './Auth/ForgotPassword' },
      { path: '/auth/reset-password/:token', component: './Auth/RedefinePassword' },
      { path: '/auth/register', component: './Auth/Register' },
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
      { path: '/', redirect: '/dashboard/analysis' },

      // exception
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
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

      // account
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        hideInMenu: true,
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
            component: './Account/Settings/AccountSettings',
            routes: [
              { path: '/account/settings', redirect: '/account/settings/basic' },
              {
                path: '/account/settings/basic',
                component: './Account/Settings/BasicInfo',
              },
              {
                path: '/account/settings/password',
                component: './Account/Settings/ChangePassword',
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

      // dashboard
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

      // admin
      {
        name: 'admin',
        path: '/admin',
        component: './Admin/Menu',
        hideInMenu: true,
        routes: [
          { path: '/admin', redirect: '/admin/workflows' },
          {
            path: '/admin/workflows',
            name: 'workflows',
            component: './Admin/Workflows/Workflows',
          },
          {
            path: '/admin/users',
            name: 'users',
            component: './Admin/Users/Users',
          },
        ],
      },

      // teams
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
            path: '/teams/new',
            name: 'new-team',
            component: './Teams/NewTeam',
            hideInMenu: true,
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
                path: '/teams/:id/edit',
                name: 'team-edit',
                component: './Teams/EditTeam',
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

      // projects
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
              { path: '/projects/:id/boards', redirect: '/projects/:id' },
              {
                path: '/projects/:id/edit',
                name: 'edit-project',
                component: './Projects/EditProject',
              },
              {
                path: '/projects/:id/boards/new',
                name: 'new-board',
                component: './Projects/NewBoard',
              },
              {
                path: '/projects/:id/boards/:boardId',
                name: 'project-boards',
                component: './Projects/BoardSelector',
              },
              {
                path: '/projects/:id/workflows',
                name: 'project-workflows',
                component: './Projects/Workflows',
              },
            ],
          },
        ],
      },

      // demos
      // only show in development
      ...(process.env.NODE_ENV === 'development'
        ? [
            {
              path: '/demos',
              name: 'demos',
              routes: [
                {
                  path: '/demos/form',
                  icon: 'form',
                  name: 'form',
                  routes: [
                    {
                      path: '/demos/form/basic-form',
                      name: 'basicform',
                      component: './Forms/BasicForm',
                    },
                    {
                      path: '/demos/form/step-form',
                      name: 'stepform',
                      component: './Forms/StepForm',
                      hideChildrenInMenu: true,
                      routes: [
                        {
                          path: '/demos/form/step-form',
                          redirect: '/demos/form/step-form/info',
                        },
                        {
                          path: '/demos/form/step-form/info',
                          name: 'info',
                          component: './Forms/StepForm/Step1',
                        },
                        {
                          path: '/demos/form/step-form/confirm',
                          name: 'confirm',
                          component: './Forms/StepForm/Step2',
                        },
                        {
                          path: '/demos/form/step-form/result',
                          name: 'result',
                          component: './Forms/StepForm/Step3',
                        },
                      ],
                    },
                    {
                      path: '/demos/form/advanced-form',
                      name: 'advancedform',
                      authority: ['admin'],
                      component: './Forms/AdvancedForm',
                    },
                  ],
                },

                // list
                {
                  path: '/demos/list',
                  icon: 'table',
                  name: 'list',
                  routes: [
                    {
                      path: '/demos/list/table-list',
                      name: 'searchtable',
                      component: './List/TableList',
                    },
                    {
                      path: '/demos/list/basic-list',
                      name: 'basiclist',
                      component: './List/BasicList',
                    },
                    {
                      path: '/demos/list/card-list',
                      name: 'cardlist',
                      component: './List/CardList',
                    },
                    {
                      path: '/demos/list/search',
                      name: 'searchlist',
                      component: './List/List',
                      routes: [
                        {
                          path: '/demos/list/search',
                          redirect: '/list/search/articles',
                        },
                        {
                          path: '/demos/list/search/articles',
                          name: 'articles',
                          component: './List/Articles',
                        },
                        {
                          path: '/demos/list/search/projects',
                          name: 'projects',
                          component: './List/Projects',
                        },
                        {
                          path: '/demos/list/search/applications',
                          name: 'applications',
                          component: './List/Applications',
                        },
                      ],
                    },
                  ],
                },

                // profile
                {
                  path: '/demos/profile',
                  name: 'profile',
                  icon: 'profile',
                  routes: [
                    // profile
                    {
                      path: '/demos/profile/basic',
                      name: 'basic',
                      component: './Profile/BasicProfile',
                    },
                    {
                      path: '/demos/profile/advanced',
                      name: 'advanced',
                      authority: ['admin'],
                      component: './Profile/AdvancedProfile',
                    },
                  ],
                },

                // result
                {
                  name: 'result',
                  icon: 'check-circle-o',
                  path: '/demos/result',
                  routes: [
                    // result
                    {
                      path: '/demos/result/success',
                      name: 'success',
                      component: './Result/Success',
                    },
                    { path: '/demos/result/fail', name: 'fail', component: './Result/Error' },
                  ],
                },
              ],
            },
          ]
        : []),

      {
        component: '404',
      },
    ],
  },
];
