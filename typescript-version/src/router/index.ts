import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard', meta: { auth: false } },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
          meta: { auth: true },
        },
        {
          path: 'tabs',
          component: () => import('../pages/tabs.vue'),
          meta: { auth: true },
        },
        {
          path: 'statistics',
          component: () => import('../views/dashboard/Chart.vue'),
          meta: { auth: true },
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
          meta: { auth: true },
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
          meta: { auth: true },
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
          meta: { auth: true },
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
          meta: { auth: true },
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
          meta: { auth: true },
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
          meta: { auth: true },
        },

        {
          path: 'manager-user',
          component: () => import('../pages/manager-user.vue'),
          meta: { auth: true },
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
          meta: { auth: true },
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
          meta: { auth: false },
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

export default router
