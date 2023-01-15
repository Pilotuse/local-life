import { useRef, useEffect, useState } from 'react'
import { ProForm, ProFormText, ProFormInstance } from '@ant-design/pro-components';
import { message } from 'antd';
import { useParams ,history} from 'umi'
import { getArgs } from '@/utils/getArgs'
import service from '@/services'

import styles from './index.less'

interface onFinishProps {
  username: string;
  password_one: string;
  password_two: string;
}

const Reset = () => {
  const formRef = useRef<ProFormInstance>();
  const params = useParams<{ id: string }>()
  const [args] = useState<{ username: string }>(getArgs())

  
  const onFinish = async (values: onFinishProps) => {
    const { username, password_one: password } = values
    const { id } = params as { id: string }
    const result = await service.UserController.resetPassword({
      username, password, reset_code: id
    })
    if(result?.success) {
      message.success(result?.msg)
      history.push('/login')
      return
    }
    message.success(result?.msg)
  }

  useEffect(() => {
    formRef.current?.setFieldsValue({ username: args.username })
  }, [])

  return (
    <div className={styles["reset-container"]}>
      <div className={styles["reset-form"]}>
        <div style={{ width: '60%' }}>
          <h1 style={{ marginBottom: 20, fontSize: 22 }}>重置密码</h1>
          <ProForm
            formRef={formRef}
            autoFocusFirstInput
            onFinish={onFinish}
          >
            <ProFormText name="username" disabled label="用户名" />
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
                {
                  validator: (_, value) => {
                    const password_one = formRef.current?.getFieldValue('password_one')
                    if(!value) {
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
        </div>
      </div>
    </div>
  );
};

export default Reset
