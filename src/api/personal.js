// 导入axios请求模块
import request from "./../utils/request";
import CONF from "./../conf/constant";

// 定义使用后端系统
const headers = {
  [CONF.systemHeaderKey]: "program",
};

/**
 * 获取前端用户拥有权限的菜单
 */
export function getInfo() {
  return request({
    headers,
    url: "/personal/info",
    method: "post",
  });
}

/**
 * 获取登录用户信息
 */
export function getMenus() {
  return request({
    headers,
    url: "/personal/menus",
    method: "post",
  });
}

/**
 * 修改个人信息
 */
export function changeInfo(data) {
  return request({
    headers,
    url: "/personal/change-info",
    method: "post",
    data,
  });
}

/**
 * 重置密码
 */
export function resetPassword(data) {
  return request({
    headers,
    url: "/personal/reset-password",
    method: "post",
    data,
  });
}
