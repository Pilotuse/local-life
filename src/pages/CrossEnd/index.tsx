import React, { useEffect, useState } from 'react';
import { Descriptions, Space, message } from 'antd'
import { ProFormUploadButton, ProForm } from '@ant-design/pro-components';
import Barcode from '@/components/Barcode'
import services from '@/services'
import { useParams } from 'umi'
import { getArgs } from '@/utils/getArgs'
import styles from './index.less'

const CrossEnd = () => {
  const [taskInfo, setTaskInfo] = useState<any>()
  const params = useParams<{ id: string }>()
  const [args] = useState<{ username: string }>(getArgs())

  const ObservDrugTask = async () => {
    if (params.id && args.username) {
      const requestParams = { uploadId: params.id, username: args.username }
      // 首先确认任务是否结束 以及任务信息
      const result = await services.UploadController.queryProcessTask(requestParams)
      if (result.success) {
        setTaskInfo(result?.data)
        await services.DrugController.UpdateTaskState(requestParams)
      }
    }
  }

  useEffect(() => {
    if (args.username) {
      ObservDrugTask()
      return
    }
    message.error('查询失败，请稍后重试')
  }, [])


  const handleUser = (username: string) => {
    if (!username?.includes('@')) {
      return new Array(username?.length).fill('*')
    }
    if (username?.includes('@')) {
      const splitName = username?.split('@')
      const first = splitName[0]?.substring(0, 3)
      const fillName = new Array(splitName[0].length - 3).fill('*')
      return `${first}${fillName.join('')}@${splitName[1]}`
    }
    return '*********'
  }

  return (
    <div className={styles["crossedn-container"]}>
      <div className={styles["crossedn-desc"]}>
        <Descriptions
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
        >
          <Descriptions.Item label="上传用户" span={3} style={{ fontWeight: 600 }}>
            {handleUser(taskInfo?.username)}
          </Descriptions.Item>
          <Descriptions.Item label="目标图片" span={3} style={{ fontWeight: 600 }}>
            {taskInfo?.task_desc}
          </Descriptions.Item>
          <Descriptions.Item label="药品条码" span={3} style={{ fontWeight: 600 }}>
            <Barcode value={taskInfo?.drugBarcode} height={28} width={2} background="#fafafa" />
          </Descriptions.Item>
          <Descriptions.Item label="上传单号" span={3} style={{ fontWeight: 600 }}>
            {taskInfo?.uploadId}
          </Descriptions.Item>
          <Descriptions.Item label="有效期至" span={3} style={{ fontWeight: 600 }}>
            {taskInfo?.lifespan}
          </Descriptions.Item>
        </Descriptions>
        <ProForm
          submitter={false}
          onFinish={async (values) => console.log(values)}
        >
          <ProFormUploadButton
            extra={
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 12 }}>仅支持上传一张图片，上传完成后当前链接立即失效</div>
                <span style={{ fontSize: 12 }}>支持微信、抖音等扫码上传</span>
              </div>
            }
            name="file"
            title="上传支付凭证"
            width="lg"
            fieldProps={{
              maxCount: 1
            }}
          />
        </ProForm>
      </div>
    </div>
  )
}

export default CrossEnd
