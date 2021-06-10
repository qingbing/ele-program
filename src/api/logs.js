// 导入axios请求模块
import Axios from "./system/program";

/**
 * 导出
 */
export default {
  // 路由日志
  routeLogList: (data) => Axios("/route-log/list", data), // 路由访问日志列表
  routeLogView: (data) => Axios("/route-log/view", data), // 路由访问日志详情
};
