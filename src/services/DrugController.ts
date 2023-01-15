
import { request } from '@umijs/max';

/** 查询药品信息 */
export async function QueryDrugs(body?: IDrug.QueryDrugs, options?: { [key: string]: any }) {
  return request<IDrug.QueryDrugsResponse>('/api/drug/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询药品信息 */
export async function AddDrugs(body?: any, options?: { [key: string]: any }) {
  return request<IDrug.QueryDrugsResponse>('/api/drug/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}



/** 查询药品信息 */
export async function UpdateTaskState(body?: any, options?: { [key: string]: any }) {
  return request<IDrug.QueryDrugsResponse>('/api/drug/updateTaskState', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

 
