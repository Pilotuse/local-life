import React, { useState, Fragment } from 'react'
import {
  Row,
  Col,
  Avatar,
  Space,
  Input,
  Button,
  Form,
  Tooltip,
  DatePicker,
  Select,
  message,
  Upload
} from 'antd'
import type { UploadProps } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs'
import {
  EditOutlined,
  ManOutlined,
  WomanOutlined,
  CopyOutlined,
  CheckOutlined,
  CloseOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import VerifyPassword from '@/components/VerifyPassword'
import ResetPassword from './ResetPassword'

import services from '@/services'

interface UserInfoSettingsProps {
  user?: any;
  reloadUser: () => Promise<void>;
}

const promptText = "ID在服务中起重要作用，请注意信息安全，在复制时要求验证用户密码"


const UserInfoSettings = (props: UserInfoSettingsProps) => {
  const { user, reloadUser } = props
  const [editKeys, setEditKeys] = useState<string[]>([])
  const [form] = Form.useForm();
  const POST_TOKEN_LOCAL = localStorage.getItem("POST_TOKEN")
  const POST_TOKEN_SESS = sessionStorage.getItem("POST_TOKEN")

  const uploadProps: UploadProps = {
    action: '/api/user/updateAvatar',
    headers: {
      authorization: 'multipart/form-data',
      token: (POST_TOKEN_SESS || POST_TOKEN_LOCAL) as string
    },
    async onChange(info) {
      if (info.file.status === 'done') {
        message.success('更新成功');
        await reloadUser()
      }
      if (info.file.status === 'error') {
        message.error(`修改失败，请稍后重试！`);
      }
    },
  };


  const onEdit = (ekey: string) => {
    setEditKeys([
      ...editKeys,
      ekey
    ])
  }

  const onSave = async (ekey: string) => {
    const value = form.getFieldValue(ekey)
    const requestParams = { [ekey]: value }
    const result = await services.UserController.update(requestParams)
    if (result?.success) {
      // 重新发起更新用户信息请求
      await reloadUser()
      message.success('信息修改成功')
      setEditKeys(editKeys?.filter(el => el !== ekey))
      return
    }
    message.error('修改失败，请稍后重试！')
  }

  const onCancel = (ekey: string) => {
    setEditKeys(editKeys?.filter(el => el !== ekey))
  }


  return (
    <>
      <Form form={form}>
        <Row>
          <Col span={3}>头像</Col>
          <Col span={14}>
            <div style={{ cursor: 'pointer' }} title="点击修改头像">
              <Upload
                {...uploadProps}
                maxCount={1}
                showUploadList={false}
              >
                <Avatar size={64} src={user?.avatar} />
              </Upload>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={3}>花名</Col>
          <Col span={14}>
            <Space>
              {editKeys?.includes('flower_name')
                ? (<Fragment>
                  < Form.Item name="flower_name" noStyle initialValue={user?.flower_name || undefined}>
                    <Input style={{ width: 200 }} />
                  </Form.Item>
                  <Button type="link" onClick={() => onSave('flower_name')} >
                    <CheckOutlined />
                  </Button>
                  <Button type="link" onClick={() => onCancel('flower_name')}>
                    <CloseOutlined />
                  </Button>
                </Fragment>)
                : (<Fragment>
                  {user?.flower_name}
                  <a onClick={() => onEdit('flower_name')}><EditOutlined /></a>
                </Fragment>
                )}
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <Space>
              <span style={{ fontSize: 14 }}>ID</span>
              <Tooltip title={promptText} color='#f50'>
                <QuestionCircleOutlined />
              </Tooltip>
            </Space>
          </Col>
          <Col span={14}>
            <Space>
              <span>{user?.uuid}...</span>
              <VerifyPassword
                title="请验证用户密码"
                trigger={<Button type='link'   >
                  <CopyOutlined />
                </Button>
                } />
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={3}>密码</Col>
          <Col span={14}>
            <ResetPassword />
          </Col>
        </Row>

        <Row>
          <Col span={3}>性别</Col>
          <Col span={14}>
            <Space>
              {editKeys?.includes('gender')
                ? (<Fragment>
                  < Form.Item name="gender" noStyle initialValue={user?.gender || undefined}>
                    <Select
                      style={{ width: 200 }}
                      options={[
                        { value: '0', label: '女' },
                        { value: '1', label: '男' },
                      ]}
                    />
                  </Form.Item>
                  <Button type="link" onClick={() => onSave('gender')} >
                    <CheckOutlined />
                  </Button>
                  <Button type="link" onClick={() => onCancel('gender')}>
                    <CloseOutlined />
                  </Button>
                </Fragment>)
                : (<Fragment>
                  {!user?.gender ? '暂未设置'
                    : (user?.gender === "1"
                      ? <ManOutlined />
                      : <WomanOutlined />
                    )}
                  <a onClick={() => onEdit('gender')}><EditOutlined /></a>
                </Fragment>
                )}
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={3}>生日</Col>
          <Col span={14}>
            {editKeys?.includes('birthday')
              ? (<Space>
                < Form.Item name="birthday" noStyle initialValue={dayjs(user?.birthday) || undefined}>
                  <DatePicker
                    style={{ width: 200 }}
                    placeholder="请选择生日"
                    locale={locale}
                  />
                </Form.Item>
                <Button type="link" onClick={() => onSave('birthday')} >
                  <CheckOutlined />
                </Button>
                <Button type="link" onClick={() => onCancel('birthday')}>
                  <CloseOutlined />
                </Button>
              </Space>)
              : (<Space>
                {user?.birthday ? dayjs(user?.birthday).format('YYYY-MM-DD') : '暂未设置'}
                <a onClick={() => onEdit('birthday')}><EditOutlined /></a>
              </Space>
              )}
          </Col>
        </Row>
        <Row>
          <Col span={3}>创建时间</Col>
          <Col span={14}>{user?.ctime}</Col>
        </Row>
      </Form>
    </>
  )
}

export default UserInfoSettings
