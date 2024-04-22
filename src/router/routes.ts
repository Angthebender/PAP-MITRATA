import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/PageHome.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/AuthenticationLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/PageLogin.vue') },
      { path: '/signup', component: () => import('pages/PageSignup.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
