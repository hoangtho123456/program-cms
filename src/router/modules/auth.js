const authRouter = [
  {
    path: "/signin",
    alias: "/login",
    component: () => import("@/views/auth/SignIn.vue"),
    hidden: true,
  },
  {
    path: "/signup",
    alias: "/registration",
    component: () => import("@/views/auth/SignUp.vue"),
    hidden: true,
  },
];

export default authRouter;
