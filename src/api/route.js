// 导入axios请求模块
import Axios from "./system/program";

/**
 * 导出
 */
export default {
  // 路由类型
  routeTypeList: (data) => Axios("/route-type/list", data), // 查询路由类型列表
  routeTypeAdd: (data) => Axios("/route-type/add", data), // 添加路由类型
  routeTypeEdit: (data) => Axios("/route-type/edit", data), // 编辑路由类型
  routeTypeDel: (data) => Axios("/route-type/del", data), // 删除路由类型
  routeTypeView: (data) => Axios("/route-type/view", data), // 路由类型详情
  // 路由记录
  routeRecordList: (data) => Axios("/route-record/list", data), // 路由记录列表
  routeRecordEdit: (data) => Axios("/route-record/edit", data), // 编辑路由记录
  routeRecordDel: (data) => Axios("/route-record/del", data), // 删除路由记录
  routeRecordView: (data) => Axios("/route-record/view", data), // 路由记录详情
  // 编辑路由日志配置
  routeRecordEditLogConfig: (data) =>
    Axios("/route-record/edit-log-config", data),
};
