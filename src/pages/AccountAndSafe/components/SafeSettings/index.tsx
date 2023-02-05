import React from 'react'
import { Row, Col, } from 'antd'
import {
  SelectOutlined
} from '@ant-design/icons';

interface SafeSettingsProps {
  user?: any
}

const SafeSettings = (props: SafeSettingsProps) => {
  const { user } = props

  return (
    <>
      <Row>
        <Col span={3}>私钥信息</Col>
        <Col span={14}>
          asdasdasdasd
        </Col>
      </Row>
      <Row>
        <Col span={3}>本地部署申请</Col>
        <Col span={14}>否</Col>
      </Row>
      <Row>
        <Col span={3}>请求频率</Col>
        <Col span={14}>
          <span>24C</span>
        </Col>
      </Row>
      <Row>
        <Col span={3}>参数自动化</Col>
        <Col span={14}>
          <a>查看</a>
        </Col>
      </Row>

      <Row>
        <Col span={3}>监控日志查询</Col>
        <Col span={14}>
          {!user?.gender ? '已启用' : '暂未设置'}
        </Col>
      </Row>
      <Row>
        <Col span={3}>SQL数据服务</Col>
        <Col span={14}><a><SelectOutlined /> 点击前往</a></Col>
      </Row>
    </>
  )
}

export default SafeSettings
