// 导入
import Layout from "./../../views/layouts/index.vue";

// 导出个人模块路由
export default [
  {
    path: "/route-manage",
    component: Layout,
    meta: {
      title: "路由管理",
      realPath: "/route-manage/record/list",
    },
    children: [
      {
        path: "",
        redirect: "record/list",
      },
      {
        path: "type/list",
        component: () => import("../../views/route-manage/route-type/list.vue"),
        meta: { title: "路由类型" },
      },
      {
        path: "record/list",
        component: () =>
          import("../../views/route-manage/route-record/list.vue"),
        meta: { title: "路由管理" },
      },
    ],
  },
];
