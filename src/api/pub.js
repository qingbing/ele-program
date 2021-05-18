// 导入axios请求模块
import request from "./../utils/request";
import CONF from "./../conf/constant";

// 定义使用后端系统
const headers = {
  [CONF.systemHeaderKey]: "program",
};

/**
 * 系统清理缓存
 * @param {Object} data
 */
function clearCache() {
  return request({
    headers,
    method: "post",
    url: "/pub/clear-cache",
  });
}

// 导出方法
export default {
  clearCache,
};
