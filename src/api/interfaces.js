// 导入axios请求模块
import Axios from "./systems/program";

/**
 * 导出
 */
export default {
  // 系统
  interfaceSystemList: (data) => Axios("/interface-system/list", data), // 查询系统列表
  interfaceSystemAdd: (data) => Axios("/interface-system/add", data), // 添加系统
  interfaceSystemEdit: (data) => Axios("/interface-system/edit", data), // 编辑系统
  interfaceSystemDel: (data) => Axios("/interface-system/del", data), // 删除系统
  interfaceSystemView: (data) => Axios("/interface-system/view", data), // 系统详情
};
