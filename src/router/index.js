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
      children: [
        {
          path: "/voucher",
          name: "voucher",
          component: () => import("../views/Voucher/Index.vue"),
          meta: {
            title: `Voucher | ${import.meta.env.VITE_APP_TITLE}`,
          },
        },
        {
          path: "/groups",
          name: "groups",
          component: () => import("../views/Groups/Index.vue"),
          meta: {
            title: `Group | ${import.meta.env.VITE_APP_TITLE}`,
          },
          roles: ['SuperAdmin', 'GroupAdmin']
        },
        {
          path: "/Users",
          name: "Users",
          component: () => import("../views/Users/Index.vue"),
          meta: {
            title: `Users | ${import.meta.env.VITE_APP_TITLE}`,
            roles: ['SuperAdmin']
          },
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router
