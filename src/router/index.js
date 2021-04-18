import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Layout from "../views/layouts/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "Home",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("../views/login/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
