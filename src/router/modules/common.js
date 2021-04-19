// 导入
import Layout from "./../../views/layouts/index.vue";

// 导出个人模块路由
export default [
  {
    path: "",
    name: "Home",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("./../../views/Home.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: () => import("./../../views/About.vue"),
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("./../../views/login/index.vue"),
  },
];
