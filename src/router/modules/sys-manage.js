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
      // 表头管理
      {
        path: "table-header",
        meta: { title: "表头管理" },
        component: () => import("../../views/table-header/index.vue"),
      },
      {
        path: "table-header/options/:key",
        component: () => import("../../views/table-header/options.vue"),
        meta: { title: "表头选项管理" },
      },
      // 表单管理
      {
        path: "form",
        component: () => import("../../views/form/index.vue"),
        meta: { title: "表单管理" },
      },
      {
        path: "form/options/:key",
        component: () => import("../../views/form/options.vue"),
        meta: { title: "表单选项管理" },
      },
    ],
  },
];
