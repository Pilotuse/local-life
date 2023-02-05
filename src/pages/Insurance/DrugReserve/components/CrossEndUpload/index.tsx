import React, { useState } from 'react'
import { ModalForm } from '@ant-design/pro-components';
import {
  Button,
  Descriptions,
  Space,
  Form,
  message,
  Tooltip,
  QRCode,
  Spin,
  Image
} from 'antd';
import Barcode from '@/components/Barcode'
import { CheckOutlined, QrcodeOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import services from '@/services'
import dayjs from 'dayjs'
import styles from './index.less'

interface CrossEndUploadProps {
  lable: string;
  taskName: string;
  drugBarcode: number;
  userInfo: User | any;
  disabled: boolean;
}

const UploadColor: any = {
  0: '#ccc',
  1: '#1677ff',
  2: '#1677ff',
  3: '#73d13d',
  4: '#ff4d4f',
}

const ERR_IMG = {
  loadErr: 'http://127.0.0.1:7001/public/uploads/image/6a453a75-2647-4efd-8591-4e356e2c5b98-loadFail.svg',
  fail: "http://127.0.0.1:7001/public/uploads/image/fe023b64-4073-457e-9b37-bc6b420f3446-loadErr.svg"
}

const CrossEndUpload = (props: CrossEndUploadProps) => {
  const { lable, userInfo, taskName, drugBarcode, disabled } = props
  const [form] = Form.useForm();
  const [taskInfo, setTaskInfo] = useState<IFile.GenerateQrCodeResponse["data"]>()

  const queryUploadState = (task: any) => {
    if (userInfo?.username && task?.uploadId) {
      const intervalid = setInterval(async () => {
        const result = await services.UploadController.queryProcessTask({
          username: userInfo.username,
          uploadId: task?.uploadId
        })
        setTaskInfo(result?.data)
        if (result?.success && result?.data?.state === 3) {
          clearInterval(intervalid)
        }
      }, 2000)
    }
  }


  const onClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    const result = await services.UploadController.generateQrCode({ taskName, drugBarcode, task_desc: lable })
    if (result?.success) {
      setTaskInfo(result.data)
      queryUploadState(result.data)
    }
  }


  const ChihiroContent = () => {
    const desc = !!taskInfo?.chihiro ? null : "用户权限不足"
    const href = !!taskInfo?.chihiro ? "开启任务" : "申请"
    return (
      <Space>
        {desc}
        <a href={taskInfo?.chihiroPath}>{href}</a>
      </Space>
    )
  }

  return (
    <ModalForm
      title={
        <Space>
          <span style={{ fontSize: 18 }}>移动端上传图片</span>
          <span style={{
            fontSize: 12,
            fontWeight: 400,
            color: '#888'
          }}
          > 请上传合法图片，否则会冻结账户 </span>
        </Space>
      }
      trigger={
        disabled
          ? <></>
          : (<Tooltip title="支持快速从手机中上传或拍摄图片信息上传">
            <Button onClick={onClick} type="link">移动端上传</Button>
          </Tooltip>)
      }
      submitter={false}
      form={form}
      width={600}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values.name);
        message.success('提交成功');
        return true;
      }}
    >
      <div className={styles.scan}>
        <div className={styles['scan-task']}>
          <Descriptions>
            <Descriptions.Item label="用户名称" span={3} style={{ fontWeight: 600 }}>
              {userInfo.username}
            </Descriptions.Item>
            <Descriptions.Item label="目标图片" span={3}>{lable}</Descriptions.Item>
            <Descriptions.Item label="药品条码" span={3}>
              <Barcode value={drugBarcode} height={28} width={2} />
            </Descriptions.Item>
            <Descriptions.Item label="上传单号" span={3}>
              {/* 有且仅有管理员才能直接通过单号访问 */}
              {userInfo.role === 0
                ? <a href="#">{taskInfo?.uploadId}</a>
                : <>{taskInfo?.uploadId}</>}
              {/* 增加复制功能 */}
            </Descriptions.Item>
            <Descriptions.Item label="有效期至" span={3}>
              {dayjs(taskInfo?.lifespan)?.format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="当前状态" span={3}>
              <Space style={{ color: UploadColor[taskInfo?.state || "0"] }}>
                {taskInfo?.state === 0 && (<><QrcodeOutlined />链接已失效</>)}
                {[1, 2].includes(taskInfo?.state as number) && (
                  <><Spin size="small" /> {taskInfo?.state === 1 ? "未连接" : "已连接，未上传"}</>
                )}
                {taskInfo?.state === 3 && (<>
                  <CheckOutlined />上传成功
                  <a href="#"><UploadOutlined /> 重新上传</a>
                </>)}
                {taskInfo?.state === 4 && (<><CloseOutlined />上传失败</>)}
              </Space>
            </Descriptions.Item>
            {taskInfo?.state === 3
              ? (
                <Descriptions.Item label="数据千寻" span={3}>
                  {/* 未上传成功不显示，成功后显示 */}
                  <ChihiroContent />
                </Descriptions.Item>
              )
              : null
            }
          </Descriptions>
        </div>
        <div className={styles['scan-qrcode']} >
          <div>
            {/* 未上传成功显示二维码，上传成功后显示图片信息 */}
            {taskInfo?.state === 0 && (<Image width={200} src={ERR_IMG.loadErr} />)}
            {[1, 2].includes(taskInfo?.state as number) && (
              <>
                <QRCode value={taskInfo?.scanUrl || ""} />
                <div className={styles["scan-help"]}>手机扫码，快速上传</div>
              </>
            )}
            {taskInfo?.state === 3 && (<Image width={200} src={taskInfo.uploadFilePath} />)}
            {taskInfo?.state === 4 && (<Image width={200} src={ERR_IMG.fail} />)}
          </div>
        </div>
      </div>
    </ModalForm>
  );
};

export default CrossEndUpload
