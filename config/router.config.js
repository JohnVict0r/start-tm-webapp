export default [
  // auth
  {
    path: '/auth',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/auth', redirect: '/auth/login' },
      { path: '/auth/login', name: 'login', component: './Auth/Login' },
      {
        path: '/auth/forgot-password',
        name: 'forgot-password',
        component: './Auth/ForgotPassword',
      },
      {
        path: '/auth/reset-password/:token',
        name: 'reset-password',
        component: './Auth/RedefinePassword',
      },
      { path: '/auth/register', name: 'register', component: './Auth/Register' },
    ],
  },

  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authenticated', 'src/pages/Authorized'],
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
        hideInMenu: true,
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

      // teds
      // {
      //   path: '/teds',
      //   name: 'teds',
      //   icon: 'reconciliation',
      //   routes: [
      //     { path: '/teds', redirect: '/teds/explore' },
      //     {
      //       path: '/teds/explore',
      //       name: 'my-teds',
      //       icon: 'reconciliation',
      //       component: './Teds/TedsList',
      //     },
      //     {
      //       path: '/teds/new',
      //       name: 'new-ted',
      //       icon: 'plus',
      //       component: './Teds/NewTed',
      //     },
      //     {
      //       path: '/teds/:tedId',
      //       name: 'view-ted',
      //       icon: 'plus',
      //       hideInMenu: true,
      //       component: './Teds/ViewTed',
      //       routes: [
      //         { path: '/teds/:tedId', redirect: '/teds/:tedId/dashboard' },
      //         {
      //           path: '/teds/:tedId/dashboard',
      //           name: 'teds-main',
      //           component: './Teds/TedDashboard',
      //           routes: [
      //             { path: '/teds/:tedId/dashboard', redirect: '/teds/:tedId/dashboard/goals' },
      //             {
      //               path: '/teds/:tedId/dashboard/goals',
      //               name: 'teds-goals',
      //               component: './Teds/GoalsList',
      //             },
      //           ],
      //         },
      //         {
      //           path: '/teds/:tedId/goals/new',
      //           name: 'goals-new',
      //           component: './Teds/NewGoal',
      //         },
      //       ],
      //     },
      //   ],
      // },

      // projects
      {
        path: '/projects',
        name: 'projects',
        icon: 'project',
        routes: [
          { path: '/projects', redirect: '/projects/explore' },
          {
            path: '/projects/explore',
            name: 'my-projects',
            icon: 'project',
            component: './Projects/ProjectsList',
          },
          {
            path: '/projects/new',
            name: 'new-project',
            icon: 'plus',
            component: './Projects/NewProject',
          },
          {
            path: '/projects/:projectId',
            name: 'project',
            component: './Projects/ProjectView',
            hideInMenu: true,
            routes: [
              { path: '/projects/:projectId', redirect: '/projects/:projectId/details' },
              {
                path: '/projects/:projectId/details',
                name: 'details',
                component: './Projects/ProjectDetails',
              },
              {
                path: '/projects/:projectId/edit',
                name: 'edit-project',
                component: './Projects/EditProject',
              },
              {
                path: '/projects/:projectId/new-board',
                name: 'new-board',
                component: './Projects/NewBoard',
              },
              {
                path: '/projects/:projectId/workflows',
                name: 'project-workflows',
                component: './Projects/Workflows',
              },
              {
                path: '/projects/:projectId/members',
                name: 'project-members',
                component: './Projects/Members',
              },
            ],
          },
        ],
      },

      // board
      {
        path: '/boards',
        name: 'boards',
        icon: 'team',
        hideInBreadcrumb: true,
        hideInMenu: true,
        routes: [
          // { path: '/boards', redirect: '/boards' },
          {
            path: '/boards/:boardId',
            name: 'board',
            component: './Boards/BoardView',
            routes: [
              { path: '/boards/:boardId', redirect: '/boards/:boardId/board' },
              {
                path: '/boards/:boardId/board',
                name: 'board',
                component: './Boards/Board',
                routes: [
                  {
                    path: '/boards/:boardId/board/cards/:cardId',
                    name: 'card-view',
                    component: './Cards/ViewCardModal',
                  }
                ]
              },
              {
                path: '/boards/:boardId/cards/new',
                name: 'new-card',
                component: './Cards/NewCard',
              },
              {
                path: '/boards/:boardId/cards/:cardId/edit',
                name: 'edit-card',
                component: './Cards/EditCard',
              },
            ]
          },
        ]
      },

      // workflows
      {
        path: '/workflows',
        name: 'workflows',
        icon: 'fork',
        hideInBreadcrumb: true,
        hideInMenu: true,
        routes: [
          // { path: '/workflows', redirect: '/workflows/explore' },
          // {
          //  path: '/workflows/explore',
          //  name: 'my-workflows',
          //  icon: 'fork',
          //  component: './Workflows/WorkflowsList',
          // },
          {
            path: '/workflows/:id',
            name: 'workflow',
            component: './Workflows/ViewWorkflow',
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
              icon: 'appstore',
              routes: [
                // dashboard
                {
                  path: '/demos/dashboard',
                  name: 'dashboard',
                  icon: 'dashboard',
                  routes: [
                    {
                      path: '/demos/dashboard/analysis',
                      name: 'analysis',
                      component: './Dashboard/Analysis',
                    },
                    {
                      path: '/demos/dashboard/monitor',
                      name: 'monitor',
                      component: './Dashboard/Monitor',
                    },
                    {
                      path: '/demos/dashboard/workplace',
                      name: 'workplace',
                      component: './Dashboard/Workplace',
                    },
                  ],
                },

                // form
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
                      path: '/demos/profile/basic/:id',
                      name: 'basic',
                      hideInMenu: true,
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
