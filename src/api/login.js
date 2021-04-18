// 导入axios请求模块
import request from "./../utils/request";
import CONF from "./../conf/constant";

// 定义使用后端系统
const headers = {
  [CONF.systemHeaderKey]: "program",
};

/**
 * 确认当前客户端是否登录
 */
export function isLogin() {
  return request({
    headers,
    url: "/login/is-login",
    method: "post",
  });
}

/**
 * 确认当前客户端是否登录
 */
export function getSupportTypes() {
  return request({
    headers,
    url: "/login/get-support-types",
    method: "post",
  });
}

/**
 * 用户账户登录接口
 * @param {object} data 登录数据
 */
export function login(data) {
  return request({
    headers,
    url: "/login/sign-in",
    method: "post",
    data,
  });
}
