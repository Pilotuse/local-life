
declare namespace IUser {
  interface Response {
    code: number;
    success: boolean;
    data: any;
    msg: string;
  }

  interface Login {
    username: string;
    password: string;
  }

  interface Reset {
    username: string;
    password: string;
    reset_code: string;
  }

  type QueryUserInfos = any
}



declare namespace IFile {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface GenerateQrCode {
    taskName: string;
    drugBarcode: number;
    task_desc: string;
  }

  interface GenerateQrCodeResponse extends IUser.Response {
    code: number;
    success: boolean;
    msg: string;
    data: {
      /** 数据千寻权限 */
      chihiro: boolean;
      /** 数据千寻申请地址 */
      chihiroPath: string;
      /** 二维码有效期 */
      lifespan: string;
      /** 二维码地址 */
      scanUrl: string;
      /** 链接状态 0-失效 1-正常 2-已连接，未上传 3-上传成功 4-上传失败 */
      state: number;
      /** 上传工单号 */
      uploadId: string;
      /** 上传成功返回的地址 */
      uploadFilePath: string;
    }
  }

  interface QueryProcessTask {
    uploadId: string;
    username: string
  }
}


declare namespace IDrug {
  interface QueryDrugs {
    current: number;
    drugName: string;
    drug_barcode: string;
    endTime: string;
    pageSize: number;
    startTime: string;
    state: string
  }

  interface QueryDrugsResponse {
    code: number;
    success: boolean;
    data: any;
    msg: string;
  }
}