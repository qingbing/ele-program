// 导入axios请求模块
import Axios from "./system/program";

/**
 * 导出
 */
export default {
  // 表头类型
  headerList: (data) => Axios("/header/list", data), // 查询表头列表
  headerAdd: (data) => Axios("/header/add", data), // 添加表头
  headerEdit: (data) => Axios("/header/edit", data), // 编辑表头
  headerDel: (data) => Axios("/header/del", data), // 删除表头
  headerView: (data) => Axios("/header/view", data), // 表头详情
  // 表头选项
  optionList: (data) => Axios("/header-option/list", data), // 表头选项列表
  optionAdd: (data) => Axios("/header-option/add", data), // 添加表头选项
  optionEdit: (data) => Axios("/header-option/edit", data), // 编辑表头选项
  optionDel: (data) => Axios("/header-option/del", data), // 删除表头选项
  optionUp: (data) => Axios("/header-option/order-up", data), // 顺序上移
  optionDown: (data) => Axios("/header-option/order-down", data), // 顺序下移
  optionRefresh: (data) => Axios("/header-option/refresh-order", data), // 刷新表头选项顺序
};
