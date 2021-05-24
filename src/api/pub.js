// 导入axios请求模块
import request from "./../utils/request";
import CONF from "./../conf/constant";

// 请求头 header
const headers = {
  [CONF.systemHeaderKey]: CONF.systems.program,
};

/**
 * 系统清理缓存
 * @param {Object} data
 */
export function clearCache() {
  return request({
    headers,
    method: "post",
    url: "/pub/clear-cache",
  });
}
