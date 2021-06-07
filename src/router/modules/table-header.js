// 导入
import Layout from "./../../views/layouts/index.vue";

// 表头管理
export default [
  {
    path: "/table-header",
    component: Layout,
    meta: {
      title: "个人中心",
      realPath: "/table-header/index",
    },
    children: [
      {
        path: "",
        redirect: "index",
      },
      {
        path: "index",
        meta: { title: "表头管理" },
        component: () => import("../../views/table-header/index.vue"),
      },
      {
        path: "options/:key",
        component: () => import("../../views/table-header/options.vue"),
        meta: { title: "表头选项管理" },
      },
    ],
  },
];
