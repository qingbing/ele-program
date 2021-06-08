// 导入
import Layout from "./../../views/layouts/index.vue";

// 导出个人模块路由
export default [
  {
    path: "/route-manage",
    component: Layout,
    meta: {
      title: "路由管理",
      realPath: "/route-manage/route-record",
    },
    children: [
      {
        path: "",
        redirect: "route-record",
      },
      {
        path: "route-type",
        component: () => import("../../views/route-manage/route-type.vue"),
        meta: { title: "路由类型" },
      },
      {
        path: "route-record",
        component: () => import("../../views/route-manage/route-record.vue"),
        meta: { title: "路由管理" },
      },
    ],
  },
];
