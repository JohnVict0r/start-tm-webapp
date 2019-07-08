export default [
  // auth
  {
    path: '/auth',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/auth', redirect: '/auth/login' },
      //{ path: '/auth/login', name: 'login', component: './Auth/Login' },
      { path: '/auth/login', name: 'login', component: './Auth/Credentials' },
      //{ path: '/auth/callback/sabia', name: 'sabia', component: './Auth/CallbackSabia' },
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
      {
        component: '404',
      },
    ],
  },

  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/',
        redirect: '/clubs',
        authority: ['Administrador', 'Colaborador', 'Gerente'],
      },

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

      // clubs
      {
        path: '/clubs',
        name: 'clubs',
        icon: 'home',
        hideInMenu: true,
        routes: [
          { path: '/clubs', redirect: '/clubs/explore' },
          {
            path: '/clubs/explore',
            name: 'my-clubs',
            icon: 'home',
            component: './Clubs/ClubsList',
          },
          // {
          //   path: '/clubs/new',
          //   name: 'new-club',
          //   icon: 'plus',
          //   component: './Clubs/NewClub',
          //   authority: ['Administrador', 'Gerente'],
          // },
          // {
          //   path: '/clubs/:clubId/board',
          //   name: 'board',
          //   component: './Boards/Board',
          //   hideInMenu: true,
          //   routes: [
          //     {
          //       path: '/clubs/:clubId/board/cards/:cardId',
          //       name: 'card-view',
          //       component: './Cards/CardView',
          //     },
          //   ],
          // },
          {
            path: '/clubs/:clubId',
            name: 'club',
            component: './Clubs/ClubView',
            hideInMenu: true,
            hideInBreadcrumb: true,
            routes: [
              //{ path: '/clubs/:clubId', redirect: '/clubs/:clubId/milestones' },
              { path: '/clubs/:clubId' },
              {
                path: '/clubs/:clubId/members',
                name: 'members',
                component: './Clubs/Members',
              },
              {
                path: '/clubs/:clubId/edit',
                name: 'edit-club',
                component: './Clubs/EditClub',
              },
              {
                path: '/clubs/:clubId/milestones',
                name: 'milestones',
                component: './Clubs/Milestone',
              },
            ],
          },
        ],
      },

      // events
      {
        path: '/events',
        name: 'events',
        icon: 'project',
        hideInBreadcrumb: true,
        hideInMenu: true,
        routes: [
          { path: '/events', redirect: '/events/explore' },
          {
            path: '/events/explore',
            name: 'my-events',
            icon: 'project',
            component: './Events/EventsList',
          },
          {
            path: '/events/new',
            name: 'new-event',
            icon: 'plus',
            component: './Events/NewEvent',
            authority: ['Administrador'],
          },
        ],
      },

      // federations
      {
        path: '/federations',
        name: 'federations',
        icon: 'home',
        hideInBreadcrumb: true,
        routes: [
          { path: '/federations', redirect: '/federations/explore' },
          {
            path: '/federations/explore',
            name: 'my-federations',
            icon: 'home',
            component: './Federations/FederationsList',
          },
          {
            path: '/federations/new',
            name: 'new-federation',
            icon: 'plus',
            component: './Federations/FederationForm',
            authority: ['Administrador'],
          },
          {
            path: '/federations/:federationId',
            name: 'federation',
            component: './Federations/FederationView',
            hideInMenu: true,
            routes: [
              {
                path: '/federations/:federationId',
                redirect: '/federations/:federationId/clubs',
              },
              {
                path: '/federations/:federationId/clubs',
                name: 'clubs',
                component: './Federations/FederationClubs',
              },
              {
                path: '/federations/:federationId/edit',
                name: 'edit-federation',
                component: './Federations/FederationForm',
              },
              {
                path: '/federations/:federationId/new-club',
                name: 'new-club',
                component: './Federations/NewClub',
              },
              // {
              //   path: '/federations/:federationId/members',
              //   name: 'project-members',
              //   component: './Projects/Members',
              // },
            ],
          },
        ],
      },

      // projects
      // {
      //   path: '/projects',
      //   name: 'projects',
      //   icon: 'project',
      //   hideInBreadcrumb: true,
      //   routes: [
      //     { path: '/projects', redirect: '/projects/explore' },
      //     {
      //       path: '/projects/explore',
      //       name: 'my-projects',
      //       icon: 'project',
      //       component: './Projects/ProjectsList',
      //     },
      //     {
      //       path: '/projects/new',
      //       name: 'new-project',
      //       icon: 'plus',
      //       component: './Projects/NewProject',
      //       authority: ['Administrador', 'Gerente'],
      //     },
      //     {
      //       path: '/projects/:projectId',
      //       name: 'project',
      //       component: './Projects/ProjectView',
      //       hideInMenu: true,
      //       routes: [
      //         { path: '/projects/:projectId', redirect: '/projects/:projectId/details' },
      //         {
      //           path: '/projects/:projectId/details',
      //           name: 'details',
      //           component: './Projects/ProjectDetails',
      //         },
      //         {
      //           path: '/projects/:projectId/edit',
      //           name: 'edit-project',
      //           component: './Projects/EditProject',
      //         },
      //         {
      //           path: '/projects/:projectId/new-team',
      //           name: 'new-team',
      //           component: './Projects/NewTeam',
      //         },
      //         {
      //           path: '/projects/:projectId/members',
      //           name: 'project-members',
      //           component: './Projects/Members',
      //         },
      //       ],
      //     },
      //   ],
      // },

      // admin
      {
        name: 'admin',
        path: '/admin',
        icon: 'tool',
        component: './Admin/Menu',
        authority: ['Administrador'],
        routes: [
          {
            path: '/admin/users/:userId/edit',
            name: 'edit-user',
            icon: 'team',
            component: './Admin/Users/EditUser',
            hideInBreadcrumb: true,
            hideInMenu: true,
          },
          { path: '/admin', redirect: '/admin/users' },
          {
            path: '/admin/users',
            name: 'users',
            icon: 'team',
            component: './Admin/Users/Users',
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
                      authority: ['Administrador'],
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
                      authority: ['Administrador'],
                      component: './Profile/AdvancedProfile',
                    },
                  ],
                },

                //  editor
                {
                  name: 'editor',
                  icon: 'highlight',
                  path: '/demos/editor',
                  routes: [
                    {
                      path: '/demos/editor/flow',
                      name: 'flow',
                      component: './Editor/GGEditor/Flow',
                    },
                    {
                      path: '/demos/editor/mind',
                      name: 'mind',
                      component: './Editor/GGEditor/Mind',
                    },
                    {
                      path: '/demos/editor/koni',
                      name: 'koni',
                      component: './Editor/GGEditor/Koni',
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
