export default [
  // auth
  {
    path: '/auth',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/auth', redirect: '/auth/login' },
      // { path: '/auth/login', name: 'login', component: './Auth/Login' },
      { path: '/auth/login', name: 'login', component: './Auth/Credentials' },
      // { path: '/auth/callback/sabia', name: 'sabia', component: './Auth/CallbackSabia' },
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
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/',
        redirect: '/federations',
        authority: ['Administrator', 'Guest', 'Gerente'],
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
            ],
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
            path: '/clubs/:clubId',
            name: 'club',
            component: './Clubs/ClubView',
            hideInMenu: true,
            hideInBreadcrumb: true,
            routes: [
              {
                path: '/clubs/:clubId/members',
                name: 'members',
                component: './Clubs/Members',
              },
              {
                path: '/clubs/:clubId/edit',
                name: 'edit-club',
                component: './Clubs/ClubForm',
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
            component: './Events/EventForm',
            authority: ['Administrator'],
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
            authority: ['Administrator'],
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
                path: '/federations/:federationId/edit',
                name: 'edit-federation',
                component: './Federations/EditFederation',
              },
              {
                path: '/federations/:federationId/clubs',
                name: 'clubs',
                component: './Federations/FederationClubs',
              },
              {
                path: '/federations/:federationId/new-club',
                name: 'new-club',
                component: './Clubs/ClubForm',
              },
              {
                path: '/federations/:federationId/events',
                name: 'events',
                component: './Federations/FederationEvents',
              },
              {
                path: '/federations/:federationId/new-event',
                name: 'new-event',
                component: './Events/EventForm',
              },
            ],
          },
        ],
      },

      // admin
      // {
      //   name: 'admin',
      //   path: '/admin',
      //   icon: 'tool',
      //   component: './Admin/Menu',
      //   authority: ['Administrator'],
      //   routes: [
      //     {
      //       path: '/admin/users/:userId/edit',
      //       name: 'edit-user',
      //       icon: 'team',
      //       component: './Admin/Users/EditUser',
      //       hideInBreadcrumb: true,
      //       hideInMenu: true,
      //     },
      //     { path: '/admin', redirect: '/admin/users' },
      //     {
      //       path: '/admin/users',
      //       name: 'users',
      //       icon: 'team',
      //       component: './Admin/Users/Users',
      //     },
      //   ],
      // },

      // demos
      // only show in development
      ...(process.env.NODE_ENV === 'development'
        ? [
            {
              path: '/demos',
              name: 'demos',
              icon: 'appstore',
              routes: [
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
