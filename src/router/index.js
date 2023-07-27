import { createRouter, createWebHistory } from 'vue-router'
/** RULES */
import middleware from "./middleware";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: `Sign-In | ${import.meta.env.VITE_APP_TITLE}`,
      },
      beforeEnter: middleware.guest,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        title: `Register | ${import.meta.env.VITE_APP_TITLE}`,
      },
      beforeEnter: middleware.guest,
    },
    {
      path: '/',
      name: 'main',
      component: () => import('../views/MainView.vue'),
      meta: {
        title: `${import.meta.env.VITE_APP_TITLE}`,
      },
      beforeEnter: middleware.user,
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router
