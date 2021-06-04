// 导入axios请求模块
import Axios from "./system/program";

/**
 * 系统清理缓存
 * @param {Object} data
 */
export function clearCache() {
  return Axios("/pub/clear-cache");
}
