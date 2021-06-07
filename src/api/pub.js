// 导入axios请求模块
import Axios from "./system/program";

/**
 * 系统清理缓存
 */
export function clearCache() {
  return Axios("/pub/clear-cache");
}

/**
 * 获取 table 表头
 */
export function getHeaderOptions(headerKey) {
  return Axios("/pub/header-options", {
    key: headerKey,
  });
}
