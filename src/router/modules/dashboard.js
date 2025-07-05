export default {
  path: "/",
  component: () => import("@/layout/TheLayout.vue"),
  meta: {
    title: "route.dashboard.base",
    icon: "fas fa-gauge",
  },
  children: [
    {
      path: "/",
      name: "Dashboard",
      meta: {
        title: "route.dashboard.base",
        icon: "fas fa-gauge",
        hideTotal: true,
      },
      component: () => import("@/views/dashboard/index.vue"),
    },
  ],
};
