import { request } from '@umijs/max';

/** 跨端上传文件二维码生成 */
export async function generateQrCode(body?: IFile.GenerateQrCode, options?: { [key: string]: any }) {
  return request<IFile.GenerateQrCodeResponse>('/api/file/generateQrCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 查询任务 */
export async function queryProcessTask(body?: IFile.QueryProcessTask, options?: { [key: string]: any }) {
  return request<IFile.GenerateQrCodeResponse>('/api/file/queryProcessTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}



/** 图片上传接口 */

export async function uploadImageService(_body?: IFile.GenerateQrCode, options?: { [key: string]: any }) {
  return request<IFile.GenerateQrCodeResponse>('/api/file/uploadImage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}