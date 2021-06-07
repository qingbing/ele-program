// 导入
import Layout from "./../../views/layouts/index.vue";

// 导出个人模块路由
export default [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "system",
        component: () => import("../../views/system/index.vue"),
        meta: { title: "接口系统" },
      },
    ],
  },
];
