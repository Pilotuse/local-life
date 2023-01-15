// 运行时配置
import type { RequestConfig } from 'umi';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}



export const request: RequestConfig = {
  timeout: 1000,
  // other axios options you want
  errorConfig: {
    errorHandler() {
    },
    errorThrower() {
    }
  },
  requestInterceptors: [
    (url, options) => {
      const POST_TOKEN_LOCAL = localStorage.getItem("POST_TOKEN")
      const POST_TOKEN_SESS = sessionStorage.getItem("POST_TOKEN")
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        token: POST_TOKEN_LOCAL || POST_TOKEN_SESS
      };
      return {
        url,
        options: { ...options, headers },
      };
    }
  ],
  responseInterceptors: []
};