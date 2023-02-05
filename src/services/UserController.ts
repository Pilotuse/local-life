// /* eslint-disable */
// // 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

/** 用户登录 */
export async function registerService(body: IUser.Register, options?: { [key: string]: any }) {
  return request<IUser.Response>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登录 */
export async function login(body: IUser.Login, options?: { [key: string]: any }) {
  return request<IUser.Response>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 用户密码重置 */
export async function resetPassword(body: IUser.Reset, options?: { [key: string]: any }) {
  return request<IUser.Response>('/api/user/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 用户信息查询 */
export async function queryUserInfos(_body?: IUser.QueryUserInfos, options?: { [key: string]: any }) {
  return request<IUser.Response>('/api/user/queryUserInfos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}


/** 用户UUID查询 */
export async function queryUserUUIDService(body?: IUser.QueryUserInfos, options?: { [key: string]: any }) {
  return request<IUser.Response>('/api/user/queryUserUUID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}



/** 用户信息变更 */
export async function update(body?: IUser.QueryUserInfos, options?: { [key: string]: any }) {
  return request<IUser.Response>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
