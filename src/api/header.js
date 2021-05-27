// 导入axios请求模块
import request from "./../utils/request";
import CONF from "./../conf/constant";

// 请求头 header
const headers = {
  [CONF.systemHeaderKey]: CONF.systems.program,
};
/**
 * post 的 axios 请求
 * @param {string} url 请求链接
 * @param {object} data 请求参数
 */
function postAxios(url, data) {
  return request({
    headers,
    url: url,
    method: "post",
    data,
  });
}
/**
 * 导出
 */
export default {
  // 表头类型
  headerList: (data) => postAxios("/header/list", data), // 查询表头列表
  headerAdd: (data) => postAxios("/header/add", data), // 添加表头
  headerEdit: (data) => postAxios("/header/edit", data), // 编辑表头
  headerDel: (data) => postAxios("/header/del", data), // 删除表头
  headerView: (data) => postAxios("/header/view", data), // 表头详情
  // 表头选项
  optionList: (data) => postAxios("/header-option/list", data), // 表头选项列表
  optionAdd: (data) => postAxios("/header-option/add", data), // 添加表头选项
  optionEdit: (data) => postAxios("/header-option/edit", data), // 编辑表头选项
  optionDel: (data) => postAxios("/header-option/del", data), // 删除表头选项
  optionUp: (data) => postAxios("/header-option/order-up", data), // 顺序上移
  optionDown: (data) => postAxios("/header-option/order-down", data), // 顺序下移
  optionRefresh: (data) => postAxios("/header-option/refresh-order", data), // 刷新表头选项顺序
};
