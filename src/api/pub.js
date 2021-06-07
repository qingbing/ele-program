// 导入axios请求模块
import Axios from "./system/program";

/**
 * 系统清理缓存
 */
export function clearCache() {
  return Axios("/pub/clear-cache");
}

/**
 * 获取表头输入选项
 */
export function getHeaderOptions(headerKey) {
  return Axios("/pub/header-options", {
    key: headerKey,
  });
}

/**
 * 获取表单输入选项
 */
export function getFormOptions(key) {
  return Axios("/pub/form-options", {
    key: key,
  });
}
