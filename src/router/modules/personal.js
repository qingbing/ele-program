// 导入
import Layout from "./../../views/layouts/index.vue";

// 导出个人模块路由
export default [
  {
    path: "/personal",
    component: Layout,
    children: [
      {
        path: "",
        redirect: "index",
      },
      {
        path: "index",
        name: "个人信息",
        component: () => import("../../views/personal/index.vue"),
      },
      {
        path: "change-info",
        name: "修改信息",
        component: () => import("../../views/personal/change-info.vue"),
      },
      {
        path: "reset-password",
        name: "重置密码",
        component: () => import("../../views/personal/reset-password.vue"),
      },
    ],
  },
];
