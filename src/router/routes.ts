import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
<<<<<<< Updated upstream
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
=======
    children: [
      {
        path: '',
        component: () => import('pages/PageHome.vue'),
      },
      {
        path: '/search',
        component: () => import('pages/PageSearch.vue'),
      },
      {
        path: '/chat',
        component: () => import('pages/PageChat.vue'),
      },
      {
        path: '/Users',
        component: () => import('src/pages/PageUsers.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthenticationLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/PageLogin.vue') },
      { path: '/signup', component: () => import('pages/PageSignup.vue') },
    ],
>>>>>>> Stashed changes
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
