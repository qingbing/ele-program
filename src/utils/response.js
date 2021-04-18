// 导入包
import { isFunction, dump } from "@qingbing/helper";
import { Message } from "element-ui";

/**
 * 解析后端接口响应
 * @param {mixed} data 解析后端接口响应
 * @param {boolean} isAsync 是否异步
 * @returns mixed
 */
export function parseResult(data, isAsync) {
  if (0 == data.code) {
    return data;
  }
  if (data.code > 0) {
    // 普通的常规异常：数据验证
    Message({ message: data.msg, type: "warning" });
  } else {
    // 小于0表示严重异常：权限，数据库异常等
    Message({ message: data.msg, type: "error" });
  }
  if (!isAsync) {
    return Promise.reject(data.msg);
  }
}

/**
 * 通过 await 方式获取后端函数的封装
 * @param {function} remotePromise 获取后端接口的函数
 * @param {object} param 接口参数
 * @returns mixed
 */
export async function asyncRequest(remotePromise, param) {
  if (!isFunction(remotePromise)) {
    dump.error("通过获取远端数据需要提供一个函数");
    return;
  }
  const data = await remotePromise(param, true);
  return parseResult(data);
}
