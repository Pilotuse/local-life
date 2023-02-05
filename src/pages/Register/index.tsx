import { useRef } from 'react'
import { ProForm, ProFormText, ProFormInstance } from '@ant-design/pro-components';
import { message, Descriptions, Button } from 'antd';
import { history } from '@umijs/max'
import service from '@/services'

import styles from './index.less'

interface onFinishProps {
  username: string;
  password_one: string;
  password_two: string;
}

const Register = () => {
  const formRef = useRef<ProFormInstance>();


  const onFinish = async (values: onFinishProps) => {
    const { username, password_one: password } = values
    const result = await service.UserController.registerService({
      username, password
    })

    if (result?.success) {
      message.success(result?.msg)
      history.push('/register-confirm', { username })
      return
    }

    message.error(result?.msg)
    return false
  }

  return (
    <div className={styles["register-container"]}>
      <div className={styles["register-form"]}>
        <div style={{ width: '60%' }}>
          <h1 style={{ marginBottom: 20, fontSize: 22 }}>
            用户注册
          </h1>
          <div className={styles["register-return-login"]}>
            <Button
              type="link"
              onClick={() => {
                history.push('/login')
              }}
            >
              返回登录
            </Button>
          </div>
          <ProForm
            formRef={formRef}
            autoFocusFirstInput
            onFinish={onFinish}
          >
            <ProFormText
              name="username"
              label="用户名"
              rules={[
                { required: true, message: '请输入用户名' },
                { type: 'email', message: '用户名请使用邮箱注册' }
              ]}
            />
            <ProFormText.Password
              name="password_one"
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
              ]}
            />
            <ProFormText.Password
              name="password_two"
              label="请重新输入密码"
              shouldUpdate
              rules={[
                { required: true, message: '请输入密码' },
                {
                  validator: (_, value) => {
                    const password_one = formRef.current?.getFieldValue('password_one')
                    if (!value) {
                      return Promise.reject('请重新输入密码')
                    }
                    if (value !== password_one) {
                      return Promise.reject('密码不一致，请重新输入')
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            />

          </ProForm>

          <Descriptions style={{ marginTop: 10 }}>
            <Descriptions.Item
              labelStyle={{ fontSize: 12 }}
              contentStyle={{ fontSize: 12 }}
              label="注意"
            >
              注册完成后，需要在三天内进行用户验证哦
            </Descriptions.Item>
          </Descriptions >
        </div>
      </div>
    </div>
  );
};

export default Register
