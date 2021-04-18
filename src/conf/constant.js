/**
 * 管理所有状态数据的键名，比如：TOKEN、LANGUAGE等
 */
export default {
  defaultSystem: "program", // 默认后端系统别名
  systemHeaderKey: "x-system", // 后端系统的header头设置
  loginRoute: "/login", // 登录前端路由
  loginCheckTime: 120, // 登录检查频率
  loginCheckKey: "X-LOGIN-CHECK-TIME", // 登录cookie标记
  menuCollaspeKey: "MENU-COLLASPE",
  // // Csrf token 的存储 id
  // csrfTokenKey: "X-CSRF-TOKEN",
  // // 登录 token 的存储 id
  // tokenKey: "Z-TOKEN",
  // tokenExpKey: "Z-TOKEN-EXP", // 登录 token-exp 的存储 id
  // tokenRefreshSecond: 300, // 登录 token 的刷新时间（秒）
  // // 语言的 cookie-id
  // langKey: "LANGUAGE",
  // // 七牛云配置
  // qiniuUpload: "http://up-z1.qiniup.com/",
  // qiniuPrefix: "http://qiniu.phpcorner.net/"
};
