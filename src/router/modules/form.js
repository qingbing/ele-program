// 导入
import Layout from "./../../views/layouts/index.vue";

// 表单管理
export default [
  {
    path: "/form",
    component: Layout,
    meta: {
      title: "个人中心",
      realPath: "/form/index",
    },
    children: [
      {
        path: "",
        redirect: "index",
      },
      {
        path: "index",
        component: () => import("../../views/form/index.vue"),
        meta: { title: "表单管理" },
      },
      {
        path: "options/:key",
        component: () => import("../../views/form/options.vue"),
        meta: { title: "表单选项管理" },
      },
    ],
  },
];
