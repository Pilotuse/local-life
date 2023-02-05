import React from 'react'
import { Row, Col, Button, Tooltip, Space } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';


const promptText = "您将销毁所有数据，请谨慎操作！阅览同意书后，点击销毁后将无法恢复数据，同时也将注销用户。"

const UserInfoSettings = () => {

  return (
    <>
      <Row>
        <Col span={3}>数据管理</Col>
        <Col span={14}>
          <Button type="primary">数据管理</Button>
        </Col>
      </Row>

      <Row>
        <Col span={3}>
          <Space>
            <span style={{ fontSize: 14 }}>数据销毁</span>
            <Tooltip title={promptText} color='#f50'>
              <QuestionCircleOutlined />
            </Tooltip>
          </Space>
        </Col>
        <Col span={14}>
          <Button type="primary" danger>数据销毁</Button>
        </Col>
      </Row>

    </>
  )
}

export default UserInfoSettings
