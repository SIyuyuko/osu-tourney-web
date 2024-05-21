import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/dashBoard.vue'),
    },
    {
      path: '/bind',
      name: 'bind',
      component: () => import('@/views/bind.vue'),
    },
  ],
});

export default router
