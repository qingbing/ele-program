// 导入axios请求模块
import request from "./../utils/request";
import CONF from "./../conf/constant";

// 请求头 header
const headers = {
  [CONF.systemHeaderKey]: CONF.systems.program,
};

/**
 * 查询表头列表
 * @param {Object} data 参数
 * @returns 列表
 */
export function headerList(data) {
  return request({
    headers,
    url: "/header/list",
    method: "post",
    data,
  });
}

/**
 * 添加表头
 * @param {Object} data 参数
 * @returns
 */
export function headerAdd(data) {
  return request({
    headers,
    url: "/header/add",
    method: "post",
    data,
  });
}

/**
 * 编辑表头
 * @param {Object} data 参数
 * @returns
 */
export function headerEdit(data) {
  return request({
    headers,
    url: "/header/edit",
    method: "post",
    data,
  });
}

/**
 * 删除表头
 * @param {Object} data 参数
 * @returns
 */
export function headerDel(data) {
  return request({
    headers,
    url: "/header/del",
    method: "post",
    data,
  });
}
