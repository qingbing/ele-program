// 导入
import Layout from "./../../views/layouts/index.vue";

// 导出个人模块路由
export default [
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "/system",
        component: () => import("../../views/system/index.vue"),
        meta: {
          title: "接口系统",
        },
      },
      {
        path: "/table-header",
        component: () => import("../../views/table-header/index.vue"),
        meta: {
          title: "Table表头管理",
        },
      },
      {
        path: "/table-header/options/:key",
        component: () => import("../../views/table-header/options.vue"),
        meta: {
          title: "Table表头管理",
        },
      },
    ],
  },
];
