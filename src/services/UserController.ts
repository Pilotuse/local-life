// /* eslint-disable */
// // 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

// /** 此处后端没有提供注释 GET /api/v1/queryUserList */
// export async function queryUserList(
//   params: {
//     // query
//     /** keyword */
//     keyword?: string;
//     /** current */
//     current?: number;
//     /** pageSize */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.Result_PageInfo_UserInfo__>('/api/v1/queryUserList', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }

// /** 此处后端没有提供注释 POST /api/v1/user */
// export async function addUser(
//   body?: API.UserInfoVO,
//   options?: { [key: string]: any },
// ) {
//   return request<API.Result_UserInfo_>('/api/v1/user', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }

// /** 此处后端没有提供注释 GET /api/v1/user/${param0} */
// export async function getUserDetail(
//   params: {
//     // path
//     /** userId */
//     userId?: string;
//   },
//   options?: { [key: string]: any },
// ) {
//   const { userId: param0 } = params;
//   return request<API.Result_UserInfo_>(`/api/v1/user/${param0}`, {
//     method: 'GET',
//     params: { ...params },
//     ...(options || {}),
//   });
// }

// /** 此处后端没有提供注释 PUT /api/v1/user/${param0} */
// export async function modifyUser(
//   params: {
//     // path
//     /** userId */
//     userId?: string;
//   },
//   body?: API.UserInfoVO,
//   options?: { [key: string]: any },
// ) {
//   const { userId: param0 } = params;
//   return request<API.Result_UserInfo_>(`/api/v1/user/${param0}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     params: { ...params },
//     data: body,
//     ...(options || {}),
//   });
// }

// /** 此处后端没有提供注释 DELETE /api/v1/user/${param0} */
// export async function deleteUser(
//   params: {
//     // path
//     /** userId */
//     userId?: string;
//   },
//   options?: { [key: string]: any },
// ) {
//   const { userId: param0 } = params;
//   return request<API.Result_string_>(`/api/v1/user/${param0}`, {
//     method: 'DELETE',
//     params: { ...params },
//     ...(options || {}),
//   });
// }


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




