export default {
  path: "/",
  component: () => import("@/layout/TheLayoutEmpty.vue"),
  meta: {
    title: "ErrorPages",
  },
  hidden: true,
  children: [
    {
      path: "/error/301",
      name: "Page301",
      meta: { title: "ErrorPages301" },
      component: () => import("@/views/Error.vue"),
      props: { errorCode: 301 },
    },
    {
      path: "/error/400",
      name: "Page400",
      meta: { title: "ErrorPages400" },
      component: () => import("@/views/Error.vue"),
      props: { errorCode: 400 },
    },
    {
      path: "/error/404",
      name: "Page404",
      meta: { title: "ErrorPages404" },
      component: () => import("@/views/Error.vue"),
      props: { errorCode: 404 },
    },
    {
      path: "/error/500",
      name: "Page500",
      meta: { title: "ErrorPages500" },
      component: () => import("@/views/Error.vue"),
      props: { errorCode: 500 },
    },
  ],
};
