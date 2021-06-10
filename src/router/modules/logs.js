// 导入
import Layout from "./../../views/layouts/index.vue";

// 导出个人模块路由
export default [
  {
    path: "/logs",
    component: Layout,
    meta: {
      title: "日志管理",
      realPath: "/logs/route-log",
    },
    children: [
      {
        path: "",
        redirect: "route-log",
      },
      {
        path: "route-log",
        component: () => import("../../views/logs/route-log.vue"),
        meta: { title: "路由访问日志" },
      },
      {
        path: "operate",
        component: () => import("../../views/logs/operate.vue"),
        meta: { title: "操作日志" },
      },
    ],
  },
];
